import assert from 'node:assert/strict';
import { after, before, test } from 'node:test';
import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import { eq } from 'drizzle-orm';
import { createSession } from '../auth/session';
import { guest, guestGroup } from '../db/schema';
import { configureTestDb } from './submit-rsvp-test-runtime';

const client = createClient({ url: 'file::memory:' });
const db = drizzle(client);
const savedSessionSecret = process.env.SESSION_SECRET;
process.env.SESSION_SECRET = 'rsvp-tests-only-secret-with-more-than-32-bytes';
configureTestDb(db);

const { server } = await import('./index.ts');
const submitRsvp = server.submitRsvp as unknown as {
	input: { parse: (input: Record<string, string>) => Record<string, string> };
	handler: (input: Record<string, string>, context: unknown) => Promise<unknown>;
};

let groupId: number;
let preFilledGuestId: number;
let addedGuestIds: number[];

async function resetFixtures() {
	await db.delete(guest);
	await db.delete(guestGroup);
	const group = await db.insert(guestGroup).values({
		name: 'Test guests',
		email: 'rsvp-test@example.invalid',
		accessCode: 'RSVPTEST',
		category: 'A',
	}).returning().get();
	groupId = group.id;

	const primary = await db.insert(guest).values({
		groupId,
		firstName: 'Alex',
		lastName: 'Example',
		isPreFilled: true,
		attendingCeremony: false,
		attendingCocktail: false,
		attendingDinner: false,
		attendingBrunch: false,
		menu: 'adulte',
		allergies: 'Existing allergy',
	}).returning().get();
	preFilledGuestId = primary.id;

	const added = await db.insert(guest).values([
		{ groupId, firstName: 'Keep', lastName: 'Guest', isPreFilled: false, allergies: 'Keep allergy' },
		{ groupId, firstName: 'Remove', lastName: 'Guest', isPreFilled: false, allergies: 'Remove allergy' },
	]).returning().all();
	addedGuestIds = added.map((entry) => entry.id);
}

function context() {
	return {
		cookies: {
			get: (name: string) => name === 'wedding_group'
				? { value: createSession('guest', { groupId }, 60) }
				: undefined,
			delete: () => undefined,
		},
	};
}

function guestFields(prefix: string, firstName: string, allergy = false): Record<string, string> {
	return {
		rsvp_submission: '1',
		[`${prefix}_first_name`]: firstName,
		[`${prefix}_last_name`]: 'Example',
		[`${prefix}_ceremony`]: 'oui',
		[`${prefix}_cocktail`]: 'oui',
		[`${prefix}_dinner`]: 'oui',
		[`${prefix}_brunch`]: 'non',
		[`${prefix}_menu`]: 'adulte',
		[`${prefix}_allergie_autre`]: allergy ? 'No peanuts' : '',
		...(allergy ? { [`${prefix}_allergie_vegetarien`]: 'oui' } : {}),
	};
}

async function submit(form: Record<string, string>) {
	// Astro validates form data against the action schema before invoking handler.
	const parsed = submitRsvp.input.parse(form);
	return submitRsvp.handler(parsed, context());
}

async function getGuest(id: number) {
	return db.select().from(guest).where(eq(guest.id, id)).get();
}

before(async () => {
	await client.execute(`CREATE TABLE guest_group (
		id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
		name TEXT NOT NULL,
		email TEXT NOT NULL,
		access_code TEXT NOT NULL UNIQUE,
		is_active INTEGER NOT NULL DEFAULT 1,
		plus_one_allowed INTEGER NOT NULL DEFAULT 0,
		bringing_pets INTEGER,
		pets_details TEXT DEFAULT '',
		rsvp_submitted_at INTEGER,
		invitation_sent_at INTEGER,
		last_access_at INTEGER,
		program TEXT DEFAULT '',
		category TEXT NOT NULL DEFAULT 'A'
	)`);
	await client.execute(`CREATE TABLE guest (
		id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
		group_id INTEGER NOT NULL,
		first_name TEXT NOT NULL,
		last_name TEXT DEFAULT '',
		is_plus_one INTEGER NOT NULL DEFAULT 0,
		is_pre_filled INTEGER NOT NULL DEFAULT 1,
		attending_ceremony INTEGER,
		attending_cocktail INTEGER,
		attending_dinner INTEGER,
		menu TEXT DEFAULT 'adulte',
		attending_brunch INTEGER,
		allergies TEXT DEFAULT ''
	)`);
	await resetFixtures();
});

after(async () => {
	await client.close();
	if (savedSessionSecret === undefined) delete process.env.SESSION_SECRET;
	else process.env.SESSION_SECRET = savedSessionSecret;
});

test('normal submission persists attendance and allergies for pre-filled guests', async () => {
	await resetFixtures();
	await submit(guestFields(`guest_${preFilledGuestId}`, 'Alex', true));

	const saved = await getGuest(preFilledGuestId);
	assert.equal(saved?.attendingCeremony, true);
	assert.equal(saved?.attendingCocktail, true);
	assert.equal(saved?.attendingDinner, true);
	assert.equal(saved?.attendingBrunch, false);
	assert.equal(saved?.allergies, 'Végétarien, No peanuts');
});

test('normal submission preserves existing added guests', async () => {
	await resetFixtures();
	const form = {
		...guestFields(`guest_${preFilledGuestId}`, 'Alex'),
		...guestFields(`added_${addedGuestIds[0]}`, 'Keep'),
	};
	await submit(form);

	const kept = await getGuest(addedGuestIds[0]);
	assert.ok(kept, 'existing added guest should remain');
	assert.equal(kept?.firstName, 'Keep');
});

test('explicit removal deletes only selected added guest', async () => {
	await resetFixtures();
	const form = {
		...guestFields(`guest_${preFilledGuestId}`, 'Alex'),
		...guestFields(`added_${addedGuestIds[0]}`, 'Keep'),
	};
	await submit(form);

	assert.ok(await getGuest(addedGuestIds[0]), 'kept added guest should remain');
	assert.equal(await getGuest(addedGuestIds[1]), undefined, 'explicitly omitted guest should be removed');
});

test('valid submission preserves intentional new-guest addition', async () => {
	await resetFixtures();
	await db.update(guestGroup).set({ plusOneAllowed: true }).where(eq(guestGroup.id, groupId));
	await submit({
		...guestFields(`guest_${preFilledGuestId}`, 'Alex'),
		...guestFields('new_0', 'New guest'),
	});

	const added = await db.select().from(guest).where(eq(guest.groupId, groupId)).all();
	assert.ok(added.some((entry) => entry.firstName === 'New guest' && !entry.isPreFilled));
});

test('empty or malformed submissions do not destructively change RSVP data', async () => {
	await resetFixtures();
	const beforePrimary = await getGuest(preFilledGuestId);
	const beforeAdded = await getGuest(addedGuestIds[0]);

	const primaryPrefix = `guest_${preFilledGuestId}`;
	const malformedPayloads = [
		{},
		{ rsvp_submission: '1' },
		{ ...guestFields(primaryPrefix, 'Alex'), [`${primaryPrefix}_ceremony`]: 'perhaps' },
		{
			...guestFields(primaryPrefix, 'Alex'),
			[`added_${addedGuestIds[0]}_first_name`]: 'Keep',
		},
		{
			...guestFields(primaryPrefix, 'Alex'),
			[`guest_${preFilledGuestId + 1000}_first_name`]: 'Foreign guest',
		},
	];
	for (const malformed of malformedPayloads) {
		try {
			await submit(malformed);
		} catch {
			// Rejecting invalid forms is safe; accepting them must also be non-destructive.
		}
	}

	assert.deepEqual(await getGuest(preFilledGuestId), beforePrimary);
	assert.deepEqual(await getGuest(addedGuestIds[0]), beforeAdded);
	assert.ok(await getGuest(addedGuestIds[1]), 'malformed submission must not remove added guests');
});
