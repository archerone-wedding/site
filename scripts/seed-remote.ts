// Add-only, incremental seed for the remote (production) Turso database.
//
// Unlike `scripts/seed.ts` (which is local-only, always targets
// `file:local.db`, and is destructive under `--reset`), this script:
//   - explicitly targets the REMOTE database via `TURSO_DATABASE_URL` /
//     `TURSO_AUTH_TOKEN` read from the environment (loaded via
//     `import 'dotenv/config'`), and fails closed unless those are present
//     and non-local;
//   - NEVER deletes or overwrites existing rows — it only inserts groups and
//     guests that appear to be missing;
//   - defaults to a DRY RUN that only prints aggregate counts; nothing is
//     written to the database unless `--apply` is passed explicitly.
//
// Matching strategy (no schema migration — existing fields only):
//   - Groups are matched by `accessCode` (unique).
//   - Guests are matched, within a matched group, by normalized
//     (firstName, lastName) identity.
// Limitation: if an access code or a guest's name changes in the CSV between
// runs, it will not be recognized as the same row and will be added again as
// a new row. It will never overwrite or delete the old one. Review the
// dry-run output before using `--apply`, especially if the CSV has been
// edited since the last successful remote seed.
//
// Output is aggregate-only: counts only. Never prints names, access codes,
// tokens, or the database URL.

import 'dotenv/config';
import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import * as fs from 'fs';
import * as path from 'path';
import { guestGroup, guest } from '../src/db/schema';
import { parseCsvRows, buildGroupes, assignAccessCodes, nomGroupe, getMostRestrictiveCategory } from './lib/csv-parsing';
import { planRemoteSeed, type ExistingGroupSummary, type ExistingGuestSummary } from './lib/remote-seed-plan';

const APPLY_FLAG = process.argv.includes('--apply');
const BATCH_SIZE = 200;

function chunk<T>(items: T[], size: number): T[][] {
	const chunks: T[][] = [];
	for (let i = 0; i < items.length; i += size) {
		chunks.push(items.slice(i, i + size));
	}
	return chunks;
}

function resolveRemoteCredentials(): { url: string; authToken: string } {
	const url = process.env.TURSO_DATABASE_URL;
	const authToken = process.env.TURSO_AUTH_TOKEN;

	if (!url || url.toLowerCase().startsWith('file:')) {
		throw new Error(
			'TURSO_DATABASE_URL must be set to a non-local remote URL to run the remote seed. ' +
				'Refusing to run against a local file; the URL value is never shown.',
		);
	}

	if (!authToken) {
		throw new Error('TURSO_AUTH_TOKEN must be set to run the remote seed.');
	}

	return { url, authToken };
}

async function run() {
	const { url, authToken } = resolveRemoteCredentials();

	const csvPath = path.resolve(process.cwd(), 'invités.csv');
	const raw = fs.readFileSync(csvPath, 'utf-8');
	const rows = parseCsvRows(raw);
	const groupes = buildGroupes(rows);
	const groupAssignments = assignAccessCodes(groupes);

	const client = createClient({ url, authToken });
	const db = drizzle(client);

	try {
		const existingGroupsRaw = await db
			.select({ id: guestGroup.id, accessCode: guestGroup.accessCode })
			.from(guestGroup)
			.all();
		const existingGuestsRaw = await db
			.select({ groupId: guest.groupId, firstName: guest.firstName, lastName: guest.lastName })
			.from(guest)
			.all();

		const existingGroups: ExistingGroupSummary[] = existingGroupsRaw;
		const existingGuests: ExistingGuestSummary[] = existingGuestsRaw;

		const plan = planRemoteSeed(groupAssignments, existingGroups, existingGuests);

		const newGuestsInNewGroups = plan.groupsToInsert.reduce(
			(sum, g) => sum + g.data.rows.filter((r) => r.preFilled).length,
			0,
		);

		console.log(
			[
				`CSV: ${rows.length} guest row(s) across ${groupAssignments.size} group(s).`,
				`Remote DB currently has ${existingGroups.length} group(s) and ${existingGuests.length} guest(s).`,
				'',
				`Plan: ${plan.groupsToInsert.length} new group(s) to insert (with ${newGuestsInNewGroups} pre-filled guest(s)).`,
				`Plan: ${plan.guestsToInsert.length} new guest(s) to insert into ${
					new Set(plan.guestsToInsert.map((g) => g.groupId)).size
				} existing group(s).`,
				`Plan: ${plan.unchangedExistingGroupCount} existing group(s) already up to date, no changes.`,
			].join('\n'),
		);

		if (plan.groupsToInsert.length === 0 && plan.guestsToInsert.length === 0) {
			console.log('\nNothing to do: remote database already matches the CSV for all matched rows.');
			return;
		}

		if (!APPLY_FLAG) {
			console.log(
				'\nDRY RUN — no changes were written. Re-run with --apply to insert the rows above into the remote database.',
			);
			return;
		}

		console.log('\nApplying changes to the remote database...');

		let insertedGroups = 0;
		let insertedGuestsInNewGroups = 0;

		for (const planned of plan.groupsToInsert) {
			const nom = nomGroupe(planned.data);
			const category = getMostRestrictiveCategory(planned.data.rows);

			const insertedGroup = await db
				.insert(guestGroup)
				.values({
					name: nom,
					email: '',
					accessCode: planned.code,
					isActive: true,
					plusOneAllowed: planned.data.plusOne,
					program: '',
					category,
				})
				.returning({ id: guestGroup.id })
				.get();

			insertedGroups++;

			const guestsForGroup = planned.data.rows
				.filter((r) => r.preFilled)
				.map((r) => ({
					groupId: insertedGroup.id,
					firstName: r.prenom,
					lastName: r.nom,
					isPreFilled: true,
				}));

			for (const batch of chunk(guestsForGroup, BATCH_SIZE)) {
				if (batch.length === 0) continue;
				await db.insert(guest).values(batch);
				insertedGuestsInNewGroups += batch.length;
			}
		}

		// Group guestsToInsert by target groupId for batched inserts into existing groups.
		const guestsByExistingGroup = new Map<number, typeof plan.guestsToInsert>();
		for (const g of plan.guestsToInsert) {
			const list = guestsByExistingGroup.get(g.groupId) ?? [];
			list.push(g);
			guestsByExistingGroup.set(g.groupId, list);
		}

		let insertedGuestsInExistingGroups = 0;
		for (const [groupId, planned] of guestsByExistingGroup) {
			const values = planned.map((p) => ({
				groupId,
				firstName: p.row.prenom,
				lastName: p.row.nom,
				isPreFilled: true,
			}));
			for (const batch of chunk(values, BATCH_SIZE)) {
				if (batch.length === 0) continue;
				await db.insert(guest).values(batch);
				insertedGuestsInExistingGroups += batch.length;
			}
		}

		console.log(
			[
				`Inserted ${insertedGroups} new group(s).`,
				`Inserted ${insertedGuestsInNewGroups} guest(s) into new group(s).`,
				`Inserted ${insertedGuestsInExistingGroups} guest(s) into existing group(s).`,
				'No existing rows were modified or deleted.',
			].join('\n'),
		);
	} finally {
		await client.close();
	}
}

run().catch((err) => {
	console.error(err instanceof Error ? err.message : 'Remote seed failed.');
	process.exitCode = 1;
});
