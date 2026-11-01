import { defineConfig } from 'drizzle-kit';
import 'dotenv/config';

// Explicit remote (production) Drizzle config. Only use this via
// `pnpm db:migrate:remote` with explicit user approval — it targets the live
// Turso database. Requires a real, non-local TURSO_DATABASE_URL; refuses to
// fall back to a local SQLite file.
const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

if (!url || url.toLowerCase().startsWith('file:')) {
	throw new Error(
		'drizzle.config.remote.ts requires a non-local TURSO_DATABASE_URL. ' +
			'Refusing to run remote migrations against a local file; URL value is not shown.',
	);
}

if (!authToken) {
	throw new Error('drizzle.config.remote.ts requires TURSO_AUTH_TOKEN to be set.');
}

export default defineConfig({
	schema: './src/db/schema.ts',
	out: './drizzle',
	dialect: 'turso',
	dbCredentials: {
		url,
		authToken,
	},
});
