import { defineConfig } from 'drizzle-kit';

// Local-only default Drizzle config. No dotenv, no remote environment
// variables: this config always targets the isolated local SQLite file so
// that `db:migrate` / `db:seed` can never accidentally touch the production
// remote Turso database. Use `drizzle.config.remote.ts` (via `db:migrate:remote`)
// for explicit, approved remote migrations.
export default defineConfig({
	schema: './src/db/schema.ts',
	out: './drizzle',
	dialect: 'sqlite',
	dbCredentials: {
		url: 'file:local.db',
	},
});
