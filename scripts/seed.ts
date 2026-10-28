import { createClient } from '@libsql/client/http';
import { drizzle } from 'drizzle-orm/libsql';
import { eq } from 'drizzle-orm';
import { guestGroup, guest } from '../src/db/schema';
import * as fs from 'fs';
import * as path from 'path';

const client = createClient({ url: process.env.TURSO_DATABASE_URL || 'file:local.db', authToken: process.env.TURSO_AUTH_TOKEN });
const db = drizzle(client);

// ============================================================================
// 1. LECTURE DU CSV
// ============================================================================

const csvPath = path.resolve(process.cwd(), 'invités.csv');
const raw = fs.readFileSync(csvPath, 'utf-8');
const lines = raw.split(/\r?\n/);

if (lines[0] && lines[0].charCodeAt(0) === 0xFEFF) {
  lines[0] = lines[0].slice(1);
}

interface CsvRow {
  prenom: string;
  nom: string;
  numeroGroupe: number;
  preFilled: boolean;
  plusOne: boolean;
  logement: boolean;
  categorie: string;
}

const rows: CsvRow[] = [];

for (let i = 1; i < lines.length; i++) {
  const line = lines[i].trim();
  if (!line) continue;

  const cols = line.split(';');
  if (cols.length < 5) continue;

  const prenom = cols[0]?.trim() || '';
  const nom = cols[1]?.trim() || '';
  const numeroGroupeStr = cols[4]?.trim() || '';

  // Ignore les placeholders non remplis
  if (
    !prenom ||
    !nom ||
    !numeroGroupeStr ||
    (prenom.toLowerCase() === 'prénom' && nom.toLowerCase() === 'nom de famille') ||
    (prenom.toLowerCase() === 'prénom' && nom.toLowerCase() === 'nom') ||
    (prenom.toLowerCase() === 'prenom' && nom.toLowerCase() === 'nom de famille')
  ) {
    continue;
  }

  const numeroGroupe = Number(numeroGroupeStr);
  if (Number.isNaN(numeroGroupe)) continue;

  const preFilled = cols[2]?.trim() === '1';
  const plusOneFlag = cols[5]?.trim() === '1';

  rows.push({
    prenom,
    nom,
    numeroGroupe,
    preFilled,
    plusOne: plusOneFlag,
    logement: cols[6]?.trim() === '1',
    categorie: cols[7]?.trim() || 'A',
  });
}

const groupes = new Map<
  number,
  {
    rows: CsvRow[];
    plusOne: boolean;
  }
>();

for (const row of rows) {
  if (!groupes.has(row.numeroGroupe)) {
    groupes.set(row.numeroGroupe, { rows: [], plusOne: false });
  }
  const g = groupes.get(row.numeroGroupe)!;
  g.rows.push(row);
  // Le groupe a droit au +1 si le CSV l'indique explicitement OU s'il y a un invité non pré-rempli
  if (row.plusOne || !row.preFilled) {
    g.plusOne = true;
  }
}

// ============================================================================
// 2. GENERATION DES CODES D ACCES
// ============================================================================

function normalizeString(str: string): string {
  return str
    .toUpperCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^A-Z0-9]/g, '');
}

function getNomPrincipal(data: { rows: CsvRow[] }): string {
  const noms = data.rows
    .map((r) => normalizeString(r.nom))
    .filter((n) => n && n !== 'NOMDEFAMILLE');
  if (noms.length === 0) return 'INVITE';

  const freq = new Map<string, number>();
  for (const n of noms) freq.set(n, (freq.get(n) || 0) + 1);

  let bestNom = noms[0];
  let bestCount = -1;
  for (const [n, c] of freq) {
    if (c > bestCount) {
      bestNom = n;
      bestCount = c;
    }
  }
  return bestNom;
}

function getCodeCandidates(data: { rows: CsvRow[] }): string[] {
  const nom = getNomPrincipal(data);
  const candidates: string[] = [];

  for (const row of data.rows) {
    const p = row.prenom.charAt(0).toUpperCase();
    if (/[A-Z]/.test(p)) {
      candidates.push(`${nom}${p}`);
    }
  }

  // Fallback si aucune initiale valide
  if (candidates.length === 0) {
    candidates.push(nom);
  }

  // Suffixes numeriques pour collisions
  const base = candidates[0];
  for (let i = 2; i <= 20; i++) {
    candidates.push(`${base}${i}`);
  }

  return candidates;
}

// Resolution des collisions entre groupes
const assignedCodes = new Set<string>();
const groupAssignments = new Map<
  number,
  { code: string; data: { rows: CsvRow[]; plusOne: boolean } }
>();

for (const [numero, data] of groupes) {
  const candidates = getCodeCandidates(data);
  let chosen = '';
  for (const c of candidates) {
    if (!assignedCodes.has(c)) {
      chosen = c;
      break;
    }
  }
  if (!chosen) {
    // Ultra-fallback tres peu probable
    let i = 21;
    while (assignedCodes.has(`${getNomPrincipal(data)}${i}`)) i++;
    chosen = `${getNomPrincipal(data)}${i}`;
  }
  assignedCodes.add(chosen);
  groupAssignments.set(numero, { code: chosen, data });
}

// ============================================================================
// 3. INSERTION EN BASE
// ============================================================================

function construireProgramme(category: string, logement: boolean) {
  const parts: string[] = [];
  parts.push('la cérémonie religieuse à 14h00');
  parts.push('le cocktail dinatoire à 16h00');

  if (category === 'A' || category === 'B' || category === 'C') {
    parts.push('le dîner');
  }
  if (category === 'A' || category === 'B') {
    parts.push('le brunch du lendemain');
  }

  let text = 'Vous êtes invités à ';
  if (parts.length === 1) {
    text += parts[0] + '.';
  } else if (parts.length === 2) {
    text += parts[0] + ' et ' + parts[1] + '.';
  } else if (parts.length > 2) {
    text += parts.slice(0, -1).join(', ') + ' et ' + parts[parts.length - 1] + '.';
  }

  if (logement) {
    text += ' Un logement sur le domaine vous est réservé.';
  }

  return text;
}

function getMostRestrictiveCategory(rows: CsvRow[]): string {
  const scores: Record<string, number> = { D: 3, C: 2, B: 1, A: 0 };
  let best = 'A';
  for (const row of rows) {
    const c = row.categorie.toUpperCase();
    if ((scores[c] ?? -1) > (scores[best] ?? -1)) {
      best = c;
    }
  }
  return best;
}

function nomGroupe(data: { rows: CsvRow[] }) {
  const noms = data.rows
    .map((r) => r.nom)
    .filter((n) => n && n.toLowerCase() !== 'nom de famille');
  const frequencies = new Map<string, number>();
  for (const n of noms) frequencies.set(n, (frequencies.get(n) || 0) + 1);
  let bestNom = '';
  let bestCount = 0;
  for (const [nom, count] of frequencies) {
    if (count > bestCount) {
      bestNom = nom;
      bestCount = count;
    }
  }

  if (bestNom && bestCount >= 2) {
    return `Famille ${bestNom}`;
  }
  if (bestNom) {
    return `${bestNom}`;
  }
  return data.rows.map((r) => r.prenom).join(' et ');
}

async function seed() {
  console.log(`Lecture CSV : ${rows.length} invités répartis en ${groupes.size} groupes`);
  console.log('Nettoyage de la base...');
  await db.delete(guest);
  await db.delete(guestGroup);

  let count = 0;
  for (const [numero, { code, data }] of groupAssignments) {
    const nom = nomGroupe(data);
    const email = '';

    const category = getMostRestrictiveCategory(data.rows);
    const hasLogement = data.rows.some((r) => r.logement);

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
    console.log(`[${count}/${groupes.size}] ${nom} — code: ${code} (${invites.length} pers.)`);
  }

  client.close();
  console.log('\nSeed terminé !');
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
