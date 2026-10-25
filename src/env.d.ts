/// <reference types="astro/client" />
import type { InferSelectModel } from 'drizzle-orm';
import type { guestGroup } from './db/schema';

declare namespace App {
	interface Locals {
		group?: InferSelectModel<typeof guestGroup>;
	}
}
