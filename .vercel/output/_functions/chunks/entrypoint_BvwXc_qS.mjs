import { S as ActionError, t as defineAction } from "./server_B-mMM9Gh.mjs";
import { n as guestGroup, r as db, t as guest } from "./schema_CSUjTRWR.mjs";
import "./_astro_actions_CHe4kN3J.mjs";
import * as mod from "zod/v4";
import { eq } from "drizzle-orm";
// src/actions/index.ts
var MENU_OPTIONS = [
	"adulte",
	"adolescent",
	"enfant",
	"bebe"
];
function getGroupFromCookie(context) {
	const groupId = context.cookies.get("wedding_group")?.value;
	if (!groupId) return null;
	return db.select().from(guestGroup).where(eq(guestGroup.id, Number(groupId))).get();
}
function generateCode() {
	const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
	let code = "";
	for (let i = 0; i < 8; i++) code += chars.charAt(Math.floor(Math.random() * 32));
	return code;
}
var server = {
	createGroup: defineAction({
		accept: "form",
		input: mod.object({
			name: mod.string().min(1),
			email: mod.string().email(),
			program: mod.string().optional(),
			plusOneAllowed: mod.boolean().optional(),
			category: mod.enum([
				"A",
				"B",
				"C",
				"D"
			]).optional()
		}),
		handler: async (input) => {
			let code = generateCode();
			while (true) {
				if (!await db.select().from(guestGroup).where(eq(guestGroup.accessCode, code)).get()) break;
				code = generateCode();
			}
			return {
				success: true,
				id: (await db.insert(guestGroup).values({
					name: input.name,
					email: input.email,
					accessCode: code,
					program: input.program || "",
					plusOneAllowed: input.plusOneAllowed ?? false,
					category: input.category ?? "A"
				}).returning().get()).id,
				code
			};
		}
	}),
	deleteGroup: defineAction({
		accept: "form",
		input: mod.object({ id: mod.coerce.number() }),
		handler: async (input) => {
			await db.delete(guest).where(eq(guest.groupId, input.id));
			await db.delete(guestGroup).where(eq(guestGroup.id, input.id));
			return { success: true };
		}
	}),
	login: defineAction({
		accept: "form",
		input: mod.object({ accessCode: mod.string().min(1) }),
		handler: async (input, context) => {
			const code = input.accessCode.trim().toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
			const group = await db.select().from(guestGroup).where(eq(guestGroup.accessCode, code)).get();
			if (!group || !group.isActive) throw new ActionError({
				code: "UNAUTHORIZED",
				message: "Nom d'utilisateur incorrect"
			});
			await db.update(guestGroup).set({ lastAccessAt: /* @__PURE__ */ new Date() }).where(eq(guestGroup.id, group.id));
			context.cookies.set("wedding_group", String(group.id), {
				httpOnly: true,
				path: "/",
				sameSite: "strict",
				secure: true,
				maxAge: 604800
			});
			return {
				success: true,
				name: group.name
			};
		}
	}),
	logout: defineAction({
		accept: "form",
		input: mod.object({}),
		handler: async (_input, context) => {
			context.cookies.delete("wedding_group", { path: "/" });
			return context.redirect("/gate");
		}
	}),
	submitRsvp: defineAction({
		accept: "form",
		input: mod.object({}),
		handler: async (_raw, context) => {
			const raw = _raw;
			const group = await getGroupFromCookie(context);
			if (!group) throw new ActionError({
				code: "UNAUTHORIZED",
				message: "Non connecté"
			});
			const allGuests = await db.select().from(guest).where(eq(guest.groupId, group.id)).all();
			const preFilledGuests = allGuests.filter((g) => g.isPreFilled);
			const addedGuests = allGuests.filter((g) => !g.isPreFilled);
			function parseBoolean(val) {
				if (val === "oui") return true;
				if (val === "non") return false;
				return null;
			}
			function parseAttending(val, allowed) {
				if (!allowed) return false;
				if (val === "oui") return true;
				if (val === "non") return false;
				return null;
			}
			const cat = group.category || "A";
			const canDinner = [
				"A",
				"B",
				"C"
			].includes(cat);
			const canBrunch = ["A", "B"].includes(cat);
			function parseMenu(val) {
				return MENU_OPTIONS.includes(val) ? val : "adulte";
			}
			function buildAllergies(raw, prefix) {
				const parts = [];
				if (raw[`${prefix}_allergie_vegetarien`] === "oui") parts.push("Végétarien");
				if (raw[`${prefix}_allergie_sansgluten`] === "oui") parts.push("Sans gluten");
				if (raw[`${prefix}_allergie_sanslactose`] === "oui") parts.push("Sans lactose");
				const autre = raw[`${prefix}_allergie_autre`]?.trim();
				if (autre) parts.push(autre);
				return parts.join(", ");
			}
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
					allergies: buildAllergies(raw, p)
				}).where(eq(guest.id, g.id));
			}
			const keptAddedIds = /* @__PURE__ */ new Set();
			for (const key of Object.keys(raw)) {
				const m = key.match(/^added_(\d+)_first_name$/);
				if (m) keptAddedIds.add(Number(m[1]));
			}
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
					allergies: buildAllergies(raw, p)
				}).where(eq(guest.id, g.id));
			}
			for (const g of addedGuests) if (!keptAddedIds.has(g.id)) await db.delete(guest).where(eq(guest.id, g.id));
			const newIndices = /* @__PURE__ */ new Set();
			for (const key of Object.keys(raw)) {
				const m = key.match(/^new_(\d+)_first_name$/);
				if (m) newIndices.add(m[1]);
			}
			for (const idx of newIndices) {
				const p = `new_${idx}`;
				await db.insert(guest).values({
					groupId: group.id,
					firstName: raw[`${p}_first_name`] || "Invité·e",
					lastName: raw[`${p}_last_name`] || "",
					isPreFilled: false,
					attendingCeremony: parseBoolean(raw[`${p}_ceremony`]),
					attendingCocktail: parseBoolean(raw[`${p}_cocktail`]),
					attendingDinner: parseAttending(raw[`${p}_dinner`], canDinner),
					attendingBrunch: parseAttending(raw[`${p}_brunch`], canBrunch),
					menu: parseMenu(raw[`${p}_menu`]),
					allergies: buildAllergies(raw, p)
				});
			}
			await db.update(guestGroup).set({ rsvpSubmittedAt: /* @__PURE__ */ new Date() }).where(eq(guestGroup.id, group.id));
			return {
				success: true,
				submitted: true
			};
		}
	})
};
export { server };
