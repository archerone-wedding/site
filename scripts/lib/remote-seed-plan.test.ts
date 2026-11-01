// Unit tests for the pure remote-seed planning/matching logic. Run with:
//   pnpm test
// (tsx --test). These tests never read the CSV file or connect to any
// database — they only exercise plain in-memory data structures.
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { planRemoteSeed, type ExistingGroupSummary, type ExistingGuestSummary } from './remote-seed-plan';
import { assignAccessCodes, buildGroupes, type CsvRow } from './csv-parsing';

function row(partial: Partial<CsvRow> & Pick<CsvRow, 'prenom' | 'nom' | 'numeroGroupe'>): CsvRow {
	return {
		preFilled: true,
		plusOne: false,
		logement: false,
		categorie: 'A',
		...partial,
	};
}

describe('planRemoteSeed', () => {
	test('plans to insert a fully new group with its pre-filled guests', () => {
		const rows = [
			row({ prenom: 'Alice', nom: 'Martin', numeroGroupe: 1 }),
			row({ prenom: 'Bob', nom: 'Martin', numeroGroupe: 1 }),
		];
		const groupes = buildGroupes(rows);
		const assignments = assignAccessCodes(groupes);

		const existingGroups: ExistingGroupSummary[] = [];
		const existingGuests: ExistingGuestSummary[] = [];

		const plan = planRemoteSeed(assignments, existingGroups, existingGuests);

		assert.equal(plan.groupsToInsert.length, 1);
		assert.equal(plan.groupsToInsert[0].data.rows.length, 2);
		assert.equal(plan.guestsToInsert.length, 0);
		assert.equal(plan.unchangedExistingGroupCount, 0);
	});

	test('does not re-insert a group or guest that already exists (idempotent re-run)', () => {
		const rows = [
			row({ prenom: 'Alice', nom: 'Martin', numeroGroupe: 1 }),
			row({ prenom: 'Bob', nom: 'Martin', numeroGroupe: 1 }),
		];
		const groupes = buildGroupes(rows);
		const assignments = assignAccessCodes(groupes);
		const [{ code }] = Array.from(assignments.values());

		const existingGroups: ExistingGroupSummary[] = [{ id: 42, accessCode: code }];
		const existingGuests: ExistingGuestSummary[] = [
			{ groupId: 42, firstName: 'Alice', lastName: 'Martin' },
			{ groupId: 42, firstName: 'Bob', lastName: 'Martin' },
		];

		const plan = planRemoteSeed(assignments, existingGroups, existingGuests);

		assert.equal(plan.groupsToInsert.length, 0);
		assert.equal(plan.guestsToInsert.length, 0);
		assert.equal(plan.unchangedExistingGroupCount, 1);
	});

	test('adds only the missing guest within an already-existing group, never touching existing ones', () => {
		const rows = [
			row({ prenom: 'Alice', nom: 'Martin', numeroGroupe: 1 }),
			row({ prenom: 'Bob', nom: 'Martin', numeroGroupe: 1 }),
		];
		const groupes = buildGroupes(rows);
		const assignments = assignAccessCodes(groupes);
		const [{ code }] = Array.from(assignments.values());

		const existingGroups: ExistingGroupSummary[] = [{ id: 7, accessCode: code }];
		const existingGuests: ExistingGuestSummary[] = [
			{ groupId: 7, firstName: 'Alice', lastName: 'Martin' },
		];

		const plan = planRemoteSeed(assignments, existingGroups, existingGuests);

		assert.equal(plan.groupsToInsert.length, 0);
		assert.equal(plan.guestsToInsert.length, 1);
		assert.equal(plan.guestsToInsert[0].groupId, 7);
		assert.equal(plan.guestsToInsert[0].row.prenom, 'Bob');
		assert.equal(plan.unchangedExistingGroupCount, 0);
	});

	test('matches guest identity case-insensitively and ignoring accents', () => {
		const rows = [row({ prenom: 'Émile', nom: 'Dupont', numeroGroupe: 1 })];
		const groupes = buildGroupes(rows);
		const assignments = assignAccessCodes(groupes);
		const [{ code }] = Array.from(assignments.values());

		const existingGroups: ExistingGroupSummary[] = [{ id: 1, accessCode: code }];
		const existingGuests: ExistingGuestSummary[] = [
			{ groupId: 1, firstName: 'emile', lastName: 'DUPONT' },
		];

		const plan = planRemoteSeed(assignments, existingGroups, existingGuests);

		assert.equal(plan.guestsToInsert.length, 0);
		assert.equal(plan.unchangedExistingGroupCount, 1);
	});

	test('ignores non-pre-filled rows when deciding what to insert into an existing group', () => {
		const rows = [
			row({ prenom: 'Alice', nom: 'Martin', numeroGroupe: 1, preFilled: true }),
			row({ prenom: 'PlusOne', nom: 'Invité', numeroGroupe: 1, preFilled: false }),
		];
		const groupes = buildGroupes(rows);
		const assignments = assignAccessCodes(groupes);
		const [{ code }] = Array.from(assignments.values());

		const existingGroups: ExistingGroupSummary[] = [{ id: 3, accessCode: code }];
		const existingGuests: ExistingGuestSummary[] = [
			{ groupId: 3, firstName: 'Alice', lastName: 'Martin' },
		];

		const plan = planRemoteSeed(assignments, existingGroups, existingGuests);

		assert.equal(plan.guestsToInsert.length, 0);
		assert.equal(plan.unchangedExistingGroupCount, 1);
	});

	test('does not insert duplicates when the same new guest appears twice in the CSV within one run', () => {
		const rows = [
			row({ prenom: 'Alice', nom: 'Martin', numeroGroupe: 1 }),
			row({ prenom: 'Alice', nom: 'Martin', numeroGroupe: 1 }),
		];
		const groupes = buildGroupes(rows);
		const assignments = assignAccessCodes(groupes);
		const [{ code }] = Array.from(assignments.values());

		const existingGroups: ExistingGroupSummary[] = [{ id: 9, accessCode: code }];
		const existingGuests: ExistingGuestSummary[] = [];

		const plan = planRemoteSeed(assignments, existingGroups, existingGuests);

		assert.equal(plan.guestsToInsert.length, 1);
	});

	test('treats a changed access code as a brand-new group (documented limitation)', () => {
		const rows = [row({ prenom: 'Alice', nom: 'Martin', numeroGroupe: 1 })];
		const groupes = buildGroupes(rows);
		const assignments = assignAccessCodes(groupes);

		const existingGroups: ExistingGroupSummary[] = [{ id: 5, accessCode: 'SOME-OTHER-CODE' }];
		const existingGuests: ExistingGuestSummary[] = [
			{ groupId: 5, firstName: 'Alice', lastName: 'Martin' },
		];

		const plan = planRemoteSeed(assignments, existingGroups, existingGuests);

		// Because matching is by accessCode only, a changed code is seen as a new group,
		// even though the guest's name matches an existing one elsewhere.
		assert.equal(plan.groupsToInsert.length, 1);
	});
});
