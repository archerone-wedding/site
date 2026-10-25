import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
// src/db/client.ts
var client = createClient({
	url: "file:local.db",
	authToken: void 0
});
var db = drizzle(client);
// src/db/schema.ts
var guestGroup = sqliteTable("guest_group", {
	id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
	name: text("name", { length: 200 }).notNull(),
	email: text("email", { length: 255 }).notNull(),
	accessCode: text("access_code", { length: 32 }).notNull().unique(),
	isActive: integer("is_active", { mode: "boolean" }).notNull().default(true),
	plusOneAllowed: integer("plus_one_allowed", { mode: "boolean" }).notNull().default(false),
	bringingPets: integer("bringing_pets", { mode: "boolean" }),
	petsDetails: text("pets_details", { length: 300 }).default(""),
	rsvpSubmittedAt: integer("rsvp_submitted_at", { mode: "timestamp" }),
	invitationSentAt: integer("invitation_sent_at", { mode: "timestamp" }),
	lastAccessAt: integer("last_access_at", { mode: "timestamp" }),
	program: text("program").default(""),
	category: text("category", { length: 1 }).notNull().default("A")
});
var guest = sqliteTable("guest", {
	id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
	groupId: integer("group_id", { mode: "number" }).notNull(),
	firstName: text("first_name", { length: 100 }).notNull(),
	lastName: text("last_name", { length: 100 }).default(""),
	isPlusOne: integer("is_plus_one", { mode: "boolean" }).notNull().default(false),
	isPreFilled: integer("is_pre_filled", { mode: "boolean" }).notNull().default(true),
	attendingCeremony: integer("attending_ceremony", { mode: "boolean" }),
	attendingCocktail: integer("attending_cocktail", { mode: "boolean" }),
	attendingDinner: integer("attending_dinner", { mode: "boolean" }),
	menu: text("menu", { length: 10 }).default("adulte"),
	attendingBrunch: integer("attending_brunch", { mode: "boolean" }),
	allergies: text("allergies", { length: 300 }).default("")
});
export { guestGroup as n, db as r, guest as t };
