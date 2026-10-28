CREATE TABLE `guest` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`group_id` integer NOT NULL,
	`first_name` text(100) NOT NULL,
	`last_name` text(100) DEFAULT '',
	`is_plus_one` integer DEFAULT false NOT NULL,
	`attending_ceremony` integer,
	`attending_cocktail` integer,
	`attending_dinner` integer,
	`menu` text(10) DEFAULT 'adulte',
	`attending_brunch` integer,
	`allergies` text(300) DEFAULT ''
);
--> statement-breakpoint
CREATE TABLE `guest_group` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text(200) NOT NULL,
	`email` text(255) NOT NULL,
	`access_code` text(32) NOT NULL,
	`is_active` integer DEFAULT true NOT NULL,
	`plus_one_allowed` integer DEFAULT false NOT NULL,
	`bringing_pets` integer,
	`pets_details` text(300) DEFAULT '',
	`rsvp_submitted_at` integer,
	`invitation_sent_at` integer,
	`last_access_at` integer,
	`program` text DEFAULT ''
);
--> statement-breakpoint
CREATE UNIQUE INDEX `guest_group_access_code_unique` ON `guest_group` (`access_code`);