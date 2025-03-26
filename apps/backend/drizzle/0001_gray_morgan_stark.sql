ALTER TABLE `posts` ADD `deletedAt` integer;--> statement-breakpoint
ALTER TABLE `users` ADD `udatedAt` integer DEFAULT (unixepoch()) NOT NULL;--> statement-breakpoint
ALTER TABLE `users` DROP COLUMN `updatedAt`;