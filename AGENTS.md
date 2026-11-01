## Development

When starting the dev server, use background mode:

```pwsh
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Database

- Local `astro dev` always uses an isolated local SQLite database (`file:local.db`), never the remote Turso database, regardless of any `TURSO_DATABASE_URL`/`TURSO_AUTH_TOKEN` present in `.env`. This guarantees local admin actions (e.g. an easy local password) can never mutate production data.
- Production runtime requires a real remote `TURSO_DATABASE_URL` (and `TURSO_AUTH_TOKEN`) and fails closed if missing; it never falls back to a local file. `pnpm preview` builds with the Node adapter and runs Astro's production preview server against configured remote Turso; it is not isolated local development. Previewed actions can write to the remote database.
- The default Drizzle CLI config (`drizzle.config.ts`) and `pnpm db:migrate` / `pnpm db:seed` are local-only: they always target `file:local.db` and never read DB target from the environment.
- Remote migrations use the explicit `drizzle.config.remote.ts` via `pnpm db:migrate:remote`, which requires a non-local `TURSO_DATABASE_URL` and `TURSO_AUTH_TOKEN`. This is a live database write — do not run it without explicit user approval. Inspect migration SQL first; do not reapply migrations already recorded as applied.
- Never print, expose, or commit the values of `TURSO_DATABASE_URL` or `TURSO_AUTH_TOKEN`.
- Treat `src/db/schema.ts` and `drizzle/` as authoritative for schema and migrations.
- The worktree-root `invités.csv` is private, ignored (untracked) local seed input; do not inspect or output its contents. It is separate from any CSV in the `development` worktree — the two worktrees' local databases and seed inputs are not shared.

## Getting started

```pwsh
pnpm install
cp "../private/invités.csv" .
cp .env.example .env
pnpm db:migrate
pnpm db:seed
pnpm dev:background
```

## Documentation

Full documentation: <https://docs.astro.build>

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

## Inspiration

The folder inspiration contains the wode of a website that covers a similar function as ours.
