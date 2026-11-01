# Wedding site

Astro site for wedding information and guest RSVPs.

## Local development database

`pnpm dev` always uses an isolated SQLite database at `local.db` in this worktree. It ignores `TURSO_DATABASE_URL` and `TURSO_AUTH_TOKEN`, even if they are present in `.env`. This database is separate from the other development worktree's database.

Initialize a fresh checkout from the project root:

```sh
pnpm install
pnpm db:migrate
```

`pnpm db:migrate` uses local-only `drizzle.config.ts` and creates the schema and migration history in `local.db`.

To populate local guest records, place the private `invités.csv` file in the project root, then run:

```sh
pnpm db:seed
```

The seed command always targets `local.db`; it never reads database credentials from `.env`. It reads `invités.csv` from the project root and refuses to replace existing local records unless explicitly confirmed:

```sh
pnpm run db:seed -- --reset
```

`--reset` deletes existing local guests and groups before reseeding. Do not use it unless replacement is intended. If you do not have the CSV, skip seeding; the site can run against an empty local database. The CSV and `local.db` are ignored by Git because they may contain private guest data. Never commit or share them.

Start the site after initializing the schema (and optionally seeding):

```sh
pnpm dev
```

Local development accepts the convenience admin password only in Astro's development mode. The production deployment does not accept it. A local `SESSION_SECRET` can be set for persistent local sessions; if omitted, development uses a random process-local key and sessions expire when the server restarts.

## Production database

Production runtime uses remote Turso and requires `TURSO_DATABASE_URL`, `TURSO_AUTH_TOKEN`, `ADMIN_SECRET`, and `SESSION_SECRET`. Local development ignores the Turso values in `.env`; the default Drizzle config and seed script remain local-only.

`pnpm preview` builds with the Node adapter and serves the production build locally, unlike `pnpm dev`; it may use configured remote Turso credentials. The Vercel adapter remains configured for deployment builds. Previewed actions can write to the remote database. Use `pnpm dev` for isolated local work. Use preview with production credentials only when intentionally testing against the remote database; prefer staging data.

Remote migrations require the explicit config and target the live database:

```sh
pnpm db:migrate:remote
```

This is a live database write. Review migration SQL and obtain approval before running it. Never use the remote command to initialize local development.

## Other commands

| Command | Action |
| --- | --- |
| `pnpm test` | Run session security tests |
| `pnpm build` | Build the production site |
| `pnpm preview` | Preview a production build locally |
