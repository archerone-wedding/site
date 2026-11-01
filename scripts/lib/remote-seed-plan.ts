// Pure planning logic for the add-only remote seed (`scripts/seed-remote.ts`).
//
// This module never touches the filesystem, the CSV, or a database — it only
// compares already-parsed CSV group assignments against already-fetched
// existing-DB summaries and decides what is missing. Keeping it pure makes it
// straightforward to unit test without a real database or the private CSV.
//
// Matching strategy (no schema migration, existing fields only):
//   - Groups are matched by `accessCode` (unique in the DB).
//   - Within a matched group, guests are matched by normalized
//     (firstName, lastName) identity.
// Limitation: if a guest's name or a group's access code changes in the CSV
// between runs, it will not match the existing row and will be treated as a
// new row to add (never as an update, and the old row is never touched).

import {
	normalizeGuestIdentity,
	type GroupAssignment,
	type CsvRow,
} from './csv-parsing';

export interface ExistingGroupSummary {
	id: number;
	accessCode: string;
}

export interface ExistingGuestSummary {
	groupId: number;
	firstName: string;
	lastName: string | null;
}

export interface PlannedNewGroup {
	code: string;
	data: GroupAssignment['data'];
}

export interface PlannedNewGuest {
	/** DB id of the existing group this guest should be attached to. */
	groupId: number;
	row: CsvRow;
}

export interface RemoteSeedPlan {
	/** Groups present in the CSV whose accessCode has no existing match: insert group + its pre-filled guests. */
	groupsToInsert: PlannedNewGroup[];
	/** Pre-filled guests whose (group, normalized identity) has no existing match within an already-existing group. */
	guestsToInsert: PlannedNewGuest[];
	/** Groups in the CSV whose accessCode already exists and needed no new guests. */
	unchangedExistingGroupCount: number;
}

/**
 * Computes the add-only diff between the CSV-derived group assignments and
 * the current state of the remote database (summarized to only the fields
 * needed for matching). Never produces instructions to update or delete
 * anything.
 */
export function planRemoteSeed(
	groupAssignments: Map<number, GroupAssignment> | GroupAssignment[],
	existingGroups: ExistingGroupSummary[],
	existingGuests: ExistingGuestSummary[],
): RemoteSeedPlan {
	const assignments = Array.isArray(groupAssignments)
		? groupAssignments
		: Array.from(groupAssignments.values());

	const existingGroupIdByCode = new Map<string, number>();
	for (const g of existingGroups) {
		existingGroupIdByCode.set(g.accessCode, g.id);
	}

	const existingIdentitiesByGroupId = new Map<number, Set<string>>();
	for (const guest of existingGuests) {
		const key = normalizeGuestIdentity(guest.firstName, guest.lastName ?? '');
		let set = existingIdentitiesByGroupId.get(guest.groupId);
		if (!set) {
			set = new Set();
			existingIdentitiesByGroupId.set(guest.groupId, set);
		}
		set.add(key);
	}

	const groupsToInsert: PlannedNewGroup[] = [];
	const guestsToInsert: PlannedNewGuest[] = [];
	let unchangedExistingGroupCount = 0;

	for (const assignment of assignments) {
		const existingGroupId = existingGroupIdByCode.get(assignment.code);

		if (existingGroupId === undefined) {
			// Whole group is new: insert it (and its pre-filled guests) in bulk.
			groupsToInsert.push({ code: assignment.code, data: assignment.data });
			continue;
		}

		// Group already exists: only add pre-filled guests that aren't already
		// present (by normalized identity), never touch existing rows.
		const seenInThisRun = new Set(existingIdentitiesByGroupId.get(existingGroupId) ?? []);
		let addedAny = false;

		for (const row of assignment.data.rows) {
			if (!row.preFilled) continue;
			const key = normalizeGuestIdentity(row.prenom, row.nom);
			if (seenInThisRun.has(key)) continue;
			seenInThisRun.add(key); // avoid inserting duplicates from repeated CSV rows in the same run
			guestsToInsert.push({ groupId: existingGroupId, row });
			addedAny = true;
		}

		if (!addedAny) unchangedExistingGroupCount++;
	}

	return { groupsToInsert, guestsToInsert, unchangedExistingGroupCount };
}
