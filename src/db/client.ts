import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';

// Local development ALWAYS uses an isolated local SQLite file, regardless of
// any TURSO_DATABASE_URL/TURSO_AUTH_TOKEN present in `.env`. This guarantees
// that local admin actions (e.g. resetting an "easy" local password) can
// never mutate the production remote Turso database.
//
// Production requires an explicit remote Turso URL and fails closed if it is
// missing, rather than silently falling back to a local file.
const client = import.meta.env.DEV
	? createClient({ url: 'file:local.db' })
	: (() => {
			const url = import.meta.env.TURSO_DATABASE_URL;
			const authToken = import.meta.env.TURSO_AUTH_TOKEN;

			if (!url || url.toLowerCase().startsWith('file:')) {
				throw new Error('TURSO_DATABASE_URL must identify a remote Turso database in production');
			}
			if (!authToken) {
				throw new Error('TURSO_AUTH_TOKEN is required for the production database');
			}

			return createClient({ url, authToken });
		})();

export const db = drizzle(client);
