import { defineAction, ActionError } from 'astro:actions';
import { z } from 'astro:schema';
import { eq } from 'drizzle-orm';
import { db } from '../db/client';
import { guestGroup, guest } from '../db/schema';

const MENU_OPTIONS = ['adulte', 'adolescent', 'enfant', 'bebe'] as const;

function getGroupFromCookie(context: any) {
	const groupId = context.cookies.get('wedding_group')?.value;
	if (!groupId) return null;
	return db.select().from(guestGroup).where(eq(guestGroup.id, Number(groupId))).get();
}

function generateCode() {
	const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
	let code = '';
	for (let i = 0; i < 8; i++) {
		code += chars.charAt(Math.floor(Math.random() * chars.length));
	}
	return code;
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
		handler: async (input) => {
			let code = generateCode();
			// S'assurer de l'unicité
			while (true) {
				const existing = await db
					.select()
					.from(guestGroup)
					.where(eq(guestGroup.accessCode, code))
					.get();
				if (!existing) break;
				code = generateCode();
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
		handler: async (input) => {
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

			context.cookies.set('wedding_group', String(group.id), {
				httpOnly: true,
				path: '/',
				sameSite: 'strict',
				secure: import.meta.env.PROD,
				maxAge: 60 * 60 * 24 * 7, // 7 jours
			});

			return { success: true, name: group.name };
		},
	}),

	logout: defineAction({
		accept: 'form',
		input: z.object({}),
		handler: async (_input, context) => {
			context.cookies.delete('wedding_group', { path: '/' });
			return { success: true };
		},
	}),

	submitRsvp: defineAction({
		accept: 'form',
		input: z.object({}),
		handler: async (_raw, context) => {
			const raw = _raw as Record<string, string | undefined>;
			const group = await getGroupFromCookie(context);
			if (!group) {
				throw new ActionError({ code: 'UNAUTHORIZED', message: 'Non connecté' });
			}

			const allGuests = await db.select().from(guest).where(eq(guest.groupId, group.id)).all();
			const preFilledGuests = allGuests.filter((g) => g.isPreFilled);
			const addedGuests = allGuests.filter((g) => !g.isPreFilled);

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
