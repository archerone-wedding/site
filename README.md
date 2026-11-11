# Wedding site

Astro site for wedding information and guest RSVPs.

## Dependency security

Use pnpm 12.16.1 (`packageManager` in `package.json`) and the committed `pnpm-lock.yaml`; Vercel installs with `pnpm install --frozen-lockfile`. The pnpm overrides pin `glob`, `path-to-regexp`, and `undici` to patched releases where current `@vercel/nft`, `@vercel/routing-utils`, and `unifont` dependency ranges still select vulnerable versions. Remove these overrides once their parent packages select patched releases.

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

### Remote guest seeding (bulk initial + add-only incremental)

`pnpm db:seed:remote` seeds the **remote** Turso database directly from `.env`'s `TURSO_DATABASE_URL` / `TURSO_AUTH_TOKEN` (loaded explicitly via `dotenv`). It is a separate command from `pnpm db:seed`, which remains local-only and unaffected by this feature.

Behavior:

- **Fails closed**: refuses to run unless `TURSO_DATABASE_URL` is set to a non-local URL (not `file:...`) and `TURSO_AUTH_TOKEN` is set. It never falls back to a local file.
- **Dry run by default**: prints only aggregate counts (number of new groups/guests the CSV implies vs. what already exists) and writes nothing. Pass `--apply` to actually perform the inserts:

  ```sh
  pnpm db:seed:remote            # dry run — prints counts only, no writes
  pnpm db:seed:remote -- --apply # performs the inserts described above
  ```

- **Add-only, never destructive**: it only INSERTs. It never updates or deletes an existing group or guest row, and it never truncates the table. This is true for both the first "bulk initial seed" run (database empty) and subsequent "incremental" runs (database already has data from manual RSVP activity).
- **Matching strategy** (uses existing schema fields only, no migration):
  - A CSV group is matched to an existing DB group by `accessCode` (unique).
  - Within a matched group, a CSV guest is matched to an existing DB guest by normalized `firstName`/`lastName` (case- and accent-insensitive).
  - If a group's generated access code or a guest identity is new (not found), it is inserted as a new row. Groups that are entirely new are inserted along with their pre-filled guests; for groups that already exist, only guests that don't already match an existing identity are inserted.
- **Limitation**: because matching relies only on `accessCode` and normalized names (no stable identifier), renaming a guest or changing a group's effective access code in the CSV between runs will cause the script to treat it as a brand-new row rather than recognizing it as the same person/group. It will never overwrite or remove the old row in that case — you may end up with both the old and the "new" row, and should reconcile manually if that happens.
- **Idempotent for unchanged data**: running the command again after a successful `--apply` (with unchanged names and access codes) reports nothing left to insert.
- Output is aggregate-only: it never prints guest names, access codes, tokens, or the database URL.

This is a live database write once `--apply` is passed. Review the dry-run output and obtain approval before running with `--apply`.

## Other commands

| Command | Action |
| --- | --- |
| `pnpm test` | Run session security and remote-seed matching tests |
| `pnpm build` | Build the production site |
| `pnpm preview` | Preview a production build locally |
| `pnpm db:seed:remote` | Dry-run (default) or `-- --apply` add-only incremental seed of the remote Turso database — see above |
