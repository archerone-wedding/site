import { defineAction, ActionError } from 'astro:actions';
import { z } from 'astro:schema';
import { eq } from 'drizzle-orm';
import { db } from '../db/client';
import { guestGroup, guest } from '../db/schema';
import { createSession, verifySession } from '../auth/session';
import { checkLoginRateLimit } from '../auth/login-rate-limit';
import { generateGuestCode } from '../auth/guest-code';

const MENU_OPTIONS = ['adulte', 'adolescent', 'enfant', 'bebe'] as const;
const GUEST_SESSION_TTL_SECONDS = 60 * 60 * 24 * 7; // 7 jours

// Validates the signed guest session cookie and, only if it is well-formed and unexpired,
// checks that the group it references still exists and is active. Any malformed, tampered,
// expired, wrong-purpose, or legacy (plain numeric) cookie is rejected before any DB access
// beyond the single active-group lookup, and before any writes.
async function getGroupFromCookie(context: any) {
	const raw = context.cookies.get('wedding_group')?.value;
	const session = verifySession<{ groupId: number }>(raw, 'guest');
	if (!session || !Number.isSafeInteger(session.groupId) || session.groupId <= 0) {
		if (raw) context.cookies.delete('wedding_group', { path: '/' });
		return null;
	}

	const group = await db.select().from(guestGroup).where(eq(guestGroup.id, session.groupId)).get();
	if (!group || !group.isActive) {
		context.cookies.delete('wedding_group', { path: '/' });
		return null;
	}
	return group;
}

// Throws an ActionError('UNAUTHORIZED') unless the request carries a valid, unexpired, signed
// admin session. Must be called before any DB access/mutation in admin-only actions.
function requireAdmin(context: any) {
	const raw = context.cookies.get('wedding_admin')?.value;
	const session = verifySession(raw, 'admin');
	if (!session) {
		throw new ActionError({ code: 'UNAUTHORIZED', message: 'Accès refusé' });
	}
}

const RSVP_FIELDS = new Set([
	'first_name', 'last_name', 'ceremony', 'cocktail', 'dinner', 'brunch', 'menu',
	'allergie_vegetarien', 'allergie_sansgluten', 'allergie_sanslactose', 'allergie_autre',
]);

function validateRsvpPayload(
	raw: Record<string, string>,
	group: typeof guestGroup.$inferSelect,
	guests: (typeof guest.$inferSelect)[],
) {
	function invalid(): never {
		throw new ActionError({ code: 'BAD_REQUEST', message: 'Réponse RSVP invalide' });
	}

	if (raw.rsvp_submission !== '1') invalid();

	const guestsByPrefix = new Map<string, typeof guest.$inferSelect>();
	for (const guestRow of guests) {
		guestsByPrefix.set(`${guestRow.isPreFilled ? 'guest' : 'added'}_${guestRow.id}`, guestRow);
	}

	const fieldsByPrefix = new Map<string, Set<string>>();
	for (const [key, value] of Object.entries(raw)) {
		if (key === 'rsvp_submission') continue;
		const match = key.match(/^(guest|added|new)_(\d+)_(.+)$/);
		if (!match) invalid();
		const [, kind, idText, field] = match;
		if (!RSVP_FIELDS.has(field)) invalid();
		const id = Number(idText);
		if (!Number.isSafeInteger(id) || id < 0 || (kind !== 'new' && id === 0)) invalid();
		if (kind === 'new') {
			if (!group.plusOneAllowed) invalid();
		} else {
			const guestRow = guestsByPrefix.get(`${kind}_${id}`);
			if (!guestRow || (kind === 'guest') !== guestRow.isPreFilled) invalid();
		}
		if (typeof value !== 'string') invalid();
		const prefix = `${kind}_${id}`;
		const fields = fieldsByPrefix.get(prefix) ?? new Set<string>();
		fields.add(field);
		fieldsByPrefix.set(prefix, fields);
	}
	if (fieldsByPrefix.size === 0) invalid();

	const category = group.category || 'A';
	const canDinner = ['A', 'B', 'C'].includes(category);
	const canBrunch = ['A', 'B'].includes(category);
	function validateGuest(prefix: string, fields: Set<string> | undefined) {
		if (!fields) invalid();
		const required = ['first_name', 'last_name', 'ceremony', 'cocktail', 'allergie_autre'];
		if (canDinner) required.push('dinner', 'menu');
		if (canBrunch) required.push('brunch');
		if (!required.every((field) => fields.has(field))) invalid();

		const firstName = raw[`${prefix}_first_name`].trim();
		const lastName = raw[`${prefix}_last_name`];
		const otherAllergy = raw[`${prefix}_allergie_autre`];
		if (!firstName || firstName.length > 100 || lastName.length > 100 || otherAllergy.length > 300) invalid();
		for (const field of ['ceremony', 'cocktail', 'dinner', 'brunch']) {
			const value = raw[`${prefix}_${field}`];
			if (value !== undefined && value !== 'oui' && value !== 'non') invalid();
		}
		if (canDinner && !MENU_OPTIONS.includes(raw[`${prefix}_menu`] as typeof MENU_OPTIONS[number])) invalid();
		for (const field of ['allergie_vegetarien', 'allergie_sansgluten', 'allergie_sanslactose']) {
			const value = raw[`${prefix}_${field}`];
			if (value !== undefined && value !== 'oui') invalid();
		}
	}

	for (const guestRow of guests) {
		const kind = guestRow.isPreFilled ? 'guest' : 'added';
		const prefix = `${kind}_${guestRow.id}`;
		const fields = fieldsByPrefix.get(prefix);
		if (guestRow.isPreFilled || fields) validateGuest(prefix, fields);
	}
	for (const [prefix, fields] of fieldsByPrefix) {
		if (prefix.startsWith('new_')) validateGuest(prefix, fields);
	}
}

export const server = {
	createGroup: defineAction({
		accept: 'form',
		input: z.object({
			name: z.string().min(1),
			email: z.string().email(),
			program: z.string().optional(),
			plusOneAllowed: z.boolean().optional(),
			category: z.enum(['A', 'B', 'C', 'D']).optional(),
		}),
		handler: async (input, context) => {
			requireAdmin(context);

			let code = generateGuestCode();
			// S'assurer de l'unicité
			while (true) {
				const existing = await db
					.select()
					.from(guestGroup)
					.where(eq(guestGroup.accessCode, code))
					.get();
				if (!existing) break;
				code = generateGuestCode();
			}

			const group = await db
				.insert(guestGroup)
				.values({
					name: input.name,
					email: input.email,
					accessCode: code,
					program: input.program || '',
					plusOneAllowed: input.plusOneAllowed ?? false,
					category: input.category ?? 'A',
				})
				.returning()
				.get();

			return { success: true, id: group.id, code };
		},
	}),

	deleteGroup: defineAction({
		accept: 'form',
		input: z.object({
			id: z.coerce.number(),
		}),
		handler: async (input, context) => {
			requireAdmin(context);

			await db.delete(guest).where(eq(guest.groupId, input.id));
			await db.delete(guestGroup).where(eq(guestGroup.id, input.id));
			return { success: true };
		},
	}),

	login: defineAction({
		accept: 'form',
		input: z.object({
			accessCode: z.string().min(1),
		}),
		handler: async (input, context) => {
			let allowed: boolean;
			try {
				allowed = await checkLoginRateLimit(context.clientAddress, 'guest', 10, 10 * 60);
			} catch {
				throw new ActionError({ code: 'UNAUTHORIZED', message: "Nom d'utilisateur incorrect" });
			}
			if (!allowed) {
				throw new ActionError({ code: 'UNAUTHORIZED', message: "Nom d'utilisateur incorrect" });
			}

			const code = input.accessCode.trim().toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
			const group = await db
				.select()
				.from(guestGroup)
				.where(eq(guestGroup.accessCode, code))
				.get();

			if (!group || !group.isActive) {
				throw new ActionError({
					code: 'UNAUTHORIZED',
					message: "Nom d'utilisateur incorrect",
				});
			}

			await db
				.update(guestGroup)
				.set({ lastAccessAt: new Date() })
				.where(eq(guestGroup.id, group.id));

			context.cookies.set(
				'wedding_group',
				createSession('guest', { groupId: group.id }, GUEST_SESSION_TTL_SECONDS),
				{
					httpOnly: true,
					path: '/',
					sameSite: 'strict',
					secure: import.meta.env.PROD,
					maxAge: GUEST_SESSION_TTL_SECONDS,
				},
			);

			return { success: true, name: group.name };
		},
	}),

	submitRsvp: defineAction({
		accept: 'form',
		input: z.record(z.string(), z.string()),
		handler: async (raw, context) => {
			const group = await getGroupFromCookie(context);
			if (!group) {
				throw new ActionError({ code: 'UNAUTHORIZED', message: 'Non connecté' });
			}

			const allGuests = await db.select().from(guest).where(eq(guest.groupId, group.id)).all();
			const preFilledGuests = allGuests.filter((g) => g.isPreFilled);
			const addedGuests = allGuests.filter((g) => !g.isPreFilled);
			validateRsvpPayload(raw, group, allGuests);

			function parseBoolean(val: string | undefined) {
				if (val === 'oui') return true;
				if (val === 'non') return false;
				return null;
			}

			function parseAttending(val: string | undefined, allowed: boolean) {
				if (!allowed) return false;
				if (val === 'oui') return true;
				if (val === 'non') return false;
				return null;
			}

			const cat = group.category || 'A';
			const canDinner = ['A', 'B', 'C'].includes(cat);
			const canBrunch = ['A', 'B'].includes(cat);

			function parseMenu(val: string | undefined) {
				return MENU_OPTIONS.includes(val as any) ? (val as typeof MENU_OPTIONS[number]) : 'adulte';
			}

			function buildAllergies(raw: Record<string, string | undefined>, prefix: string) {
				const parts: string[] = [];
				if (raw[`${prefix}_allergie_vegetarien`] === 'oui') parts.push('Végétarien');
				if (raw[`${prefix}_allergie_sansgluten`] === 'oui') parts.push('Sans gluten');
				if (raw[`${prefix}_allergie_sanslactose`] === 'oui') parts.push('Sans lactose');
				const autre = raw[`${prefix}_allergie_autre`]?.trim();
				if (autre) parts.push(autre);
				return parts.join(', ');
			}

			// 1. Mettre à jour les invités pré-remplis (names: guest_${id}_*)
			for (const g of preFilledGuests) {
				const p = `guest_${g.id}`;
				await db.update(guest).set({
					firstName: raw[`${p}_first_name`] || g.firstName,
					lastName: raw[`${p}_last_name`] ?? g.lastName,
					attendingCeremony: parseBoolean(raw[`${p}_ceremony`]),
					attendingCocktail: parseBoolean(raw[`${p}_cocktail`]),
					attendingDinner: parseAttending(raw[`${p}_dinner`], canDinner),
					attendingBrunch: parseAttending(raw[`${p}_brunch`], canBrunch),
					menu: parseMenu(raw[`${p}_menu`]),
					allergies: buildAllergies(raw, p),
				}).where(eq(guest.id, g.id));
			}

			// 2. Identifier les ajoutés encore présents dans le formulaire (names: added_${id}_*)
			const keptAddedIds = new Set<number>();
			for (const key of Object.keys(raw)) {
				const m = key.match(/^added_(\d+)_first_name$/);
				if (m) keptAddedIds.add(Number(m[1]));
			}

			// 2a. Mettre à jour les ajoutés conservés
			for (const g of addedGuests) {
				if (!keptAddedIds.has(g.id)) continue;
				const p = `added_${g.id}`;
				await db.update(guest).set({
					firstName: raw[`${p}_first_name`] || g.firstName,
					lastName: raw[`${p}_last_name`] ?? g.lastName,
					attendingCeremony: parseBoolean(raw[`${p}_ceremony`]),
					attendingCocktail: parseBoolean(raw[`${p}_cocktail`]),
					attendingDinner: parseAttending(raw[`${p}_dinner`], canDinner),
					attendingBrunch: parseAttending(raw[`${p}_brunch`], canBrunch),
					menu: parseMenu(raw[`${p}_menu`]),
					allergies: buildAllergies(raw, p),
				}).where(eq(guest.id, g.id));
			}

			// 2b. Supprimer les ajoutés retirés du formulaire
			for (const g of addedGuests) {
				if (!keptAddedIds.has(g.id)) {
					await db.delete(guest).where(eq(guest.id, g.id));
				}
			}

			// 3. Créer les nouveaux invités (names: new_${idx}_*)
			const newIndices = new Set<string>();
			for (const key of Object.keys(raw)) {
				const m = key.match(/^new_(\d+)_first_name$/);
				if (m) newIndices.add(m[1]);
			}

			for (const idx of newIndices) {
				const p = `new_${idx}`;
				await db.insert(guest).values({
					groupId: group.id,
					firstName: raw[`${p}_first_name`] || 'Invité·e',
					lastName: raw[`${p}_last_name`] || '',
					isPreFilled: false,
					attendingCeremony: parseBoolean(raw[`${p}_ceremony`]),
					attendingCocktail: parseBoolean(raw[`${p}_cocktail`]),
					attendingDinner: parseAttending(raw[`${p}_dinner`], canDinner),
					attendingBrunch: parseAttending(raw[`${p}_brunch`], canBrunch),
					menu: parseMenu(raw[`${p}_menu`]),
					allergies: buildAllergies(raw, p),
				});
			}

			// Horodatage RSVP
			await db.update(guestGroup).set({
				rsvpSubmittedAt: new Date(),
			}).where(eq(guestGroup.id, group.id));

			return { success: true, submitted: true };
		},
	}),
};
