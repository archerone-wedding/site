## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Database

- This working copy always connects to the live remote Turso database. `.env` must provide `TURSO_DATABASE_URL` and `TURSO_AUTH_TOKEN`; never print, expose, or commit their values.
- Localhost does not mean local database: Astro dev server, seed scripts, and Drizzle commands use the remote database.
- Treat `src/db/schema.ts` and `drizzle/` as authoritative for schema and migrations.
- Remote migration and seed commands are live database writes. Do not run them without explicit user approval. Inspect migration SQL first; do not reapply migrations already recorded as applied.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

## Inspiration
The folder inspiration contains the wode of a website that covers a similar function as ours. 