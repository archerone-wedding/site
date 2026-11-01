import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import { guestGroup, guest } from '../src/db/schema';
import * as fs from 'fs';
import * as path from 'path';
import {
	parseCsvRows,
	buildGroupes,
	assignAccessCodes,
	getMostRestrictiveCategory,
	nomGroupe,
	type CsvRow,
} from './lib/csv-parsing';

// This seed script NEVER reads its DB target from the environment: it is
// local-only and always targets the isolated local SQLite file, regardless
// of any TURSO_DATABASE_URL/TURSO_AUTH_TOKEN present in `.env`. This keeps
// seeding (which is destructive) from ever reaching the production remote
// Turso database.
const client = createClient({ url: 'file:local.db' });
const db = drizzle(client);

const RESET_FLAG = process.argv.includes('--reset');

// ============================================================================
// 1. LECTURE DU CSV
// ============================================================================

const csvPath = path.resolve(process.cwd(), 'invités.csv');
const raw = fs.readFileSync(csvPath, 'utf-8');

const rows: CsvRow[] = parseCsvRows(raw);
const groupes = buildGroupes(rows);

// ============================================================================
// 2. GENERATION DES CODES D ACCES
// ============================================================================

const groupAssignments = assignAccessCodes(groupes);

// ============================================================================
// 3. INSERTION EN BASE
// ============================================================================

async function seed() {
  try {
    console.log(`Lecture CSV : ${rows.length} invités répartis en ${groupes.size} groupes`);

    const existingGroups = await db.select({ id: guestGroup.id }).from(guestGroup).all();
    const existingGuests = await db.select({ id: guest.id }).from(guest).all();
    if ((existingGroups.length > 0 || existingGuests.length > 0) && !RESET_FLAG) {
      throw new Error(
        `La base locale contient déjà ${existingGroups.length} groupe(s) et ${existingGuests.length} invité(s). ` +
          'Relancez avec --reset pour confirmer le remplacement (opération destructive).',
      );
    }

    console.log('Nettoyage de la base locale...');
    await db.delete(guest);
    await db.delete(guestGroup);

    let count = 0;
    for (const { code, data } of groupAssignments.values()) {
      const nom = nomGroupe(data);
      const email = '';
      const category = getMostRestrictiveCategory(data.rows);

      const groupeInsere = await db
        .insert(guestGroup)
        .values({
          name: nom,
          email,
          accessCode: code,
          isActive: true,
          plusOneAllowed: data.plusOne,
          program: '',
          category,
        })
        .returning()
        .get();

      const invites = data.rows
        .filter((r) => r.preFilled)
        .map((r) => ({
          groupId: groupeInsere.id,
          firstName: r.prenom,
          lastName: r.nom,
          isPreFilled: true,
        }));

      if (invites.length > 0) {
        await db.insert(guest).values(invites);
      }

      count++;
    }

    console.log(`\nSeed terminé : ${count} groupe(s) et ${rows.length} invité(s) traités.`);
  } finally {
    await client.close();
  }
}

seed().catch((err) => {
  console.error(err instanceof Error ? err.message : 'Échec du seed local.');
  process.exitCode = 1;
});
