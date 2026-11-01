/// <reference types="astro/client" />
import type { InferSelectModel } from 'drizzle-orm';
import type { guestGroup } from './db/schema';

interface ImportMetaEnv {
	readonly TURSO_DATABASE_URL?: string;
	readonly TURSO_AUTH_TOKEN?: string;
	readonly ADMIN_SECRET?: string;
	readonly SESSION_SECRET?: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}

declare namespace App {
	interface Locals {
		group?: InferSelectModel<typeof guestGroup>;
	}
}
