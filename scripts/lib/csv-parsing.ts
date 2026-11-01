// Pure CSV-parsing / group-code-assignment helpers shared by the local seed
// script (`scripts/seed.ts`) and the remote incremental seed script
// (`scripts/seed-remote.ts`).
//
// Nothing in this module touches the filesystem or a database: it only
// transforms already-read CSV text / already-parsed rows into structured
// data. This keeps it easy to unit test without ever reading the private
// `invités.csv` file from a test.

export interface CsvRow {
	prenom: string;
	nom: string;
	numeroGroupe: number;
	preFilled: boolean;
	plusOne: boolean;
	logement: boolean;
	categorie: string;
}

export interface GroupeData {
	rows: CsvRow[];
	plusOne: boolean;
}

export interface GroupAssignment {
	code: string;
	data: GroupeData;
}

/**
 * Normalizes a string for use in access codes / name matching: uppercases,
 * strips diacritics, and removes anything that isn't A-Z0-9.
 */
export function normalizeString(str: string): string {
	return str
		.toUpperCase()
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.replace(/[^A-Z0-9]/g, '');
}

/**
 * Normalizes a (firstName, lastName) pair into a stable identity key used to
 * detect whether a guest row already exists, independent of case, accents,
 * or incidental punctuation/whitespace differences.
 */
export function normalizeGuestIdentity(firstName: string, lastName: string): string {
	return `${normalizeString(firstName)}|${normalizeString(lastName ?? '')}`;
}

/**
 * Parses the raw CSV text (semicolon-separated, as produced by the
 * guest-list spreadsheet) into structured rows, skipping header lines,
 * blank lines, and unfilled placeholder rows.
 */
export function parseCsvRows(raw: string): CsvRow[] {
	const lines = raw.split(/\r?\n/);

	if (lines[0] && lines[0].charCodeAt(0) === 0xfeff) {
		lines[0] = lines[0].slice(1);
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

	return rows;
}

/** Groups parsed CSV rows by their numeroGroupe column. */
export function buildGroupes(rows: CsvRow[]): Map<number, GroupeData> {
	const groupes = new Map<number, GroupeData>();

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

	return groupes;
}

export function getNomPrincipal(data: GroupeData): string {
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

export function getCodeCandidates(data: GroupeData): string[] {
	const nom = getNomPrincipal(data);
	const candidates: string[] = [];

	for (const row of data.rows) {
		const p = row.prenom.charAt(0).toUpperCase();
		if (/[A-Z]/.test(p)) {
			candidates.push(`${nom}${p}`);
		}
	}

	if (candidates.length === 0) {
		candidates.push(nom);
	}

	const base = candidates[0];
	for (let i = 2; i <= 20; i++) {
		candidates.push(`${base}${i}`);
	}

	return candidates;
}

/** Resolves access-code collisions across groups, deterministically by map iteration order. */
export function assignAccessCodes(groupes: Map<number, GroupeData>): Map<number, GroupAssignment> {
	const assignedCodes = new Set<string>();
	const groupAssignments = new Map<number, GroupAssignment>();

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
			let i = 21;
			while (assignedCodes.has(`${getNomPrincipal(data)}${i}`)) i++;
			chosen = `${getNomPrincipal(data)}${i}`;
		}
		assignedCodes.add(chosen);
		groupAssignments.set(numero, { code: chosen, data });
	}

	return groupAssignments;
}

export function construireProgramme(category: string, logement: boolean): string {
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

export function getMostRestrictiveCategory(rows: CsvRow[]): string {
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

export function nomGroupe(data: GroupeData): string {
	const noms = data.rows.map((r) => r.nom).filter((n) => n && n.toLowerCase() !== 'nom de famille');
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
