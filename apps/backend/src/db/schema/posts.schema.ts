import { relations, sql } from 'drizzle-orm';
import { int, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { usersTable } from './users.schema';
import { postTagsTable } from './posts-tags.schema';

export const postsTable = sqliteTable('posts', {
  id: int().primaryKey({ autoIncrement: true }),
  slug: text().notNull().unique(),
  title: text().notNull(),
  content: text().notNull(),
  thumbnail: text(),
  authorId: integer().references(() => usersTable.id),
  published: integer({ mode: 'boolean' }),
  createdAt: text().default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: text()
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`)
    .$onUpdate(() => sql`(CURRENT_TIMESTAMP)`)
});
export const postsRelations = relations(postsTable, ({ many }) => ({
  postsToTags: many(postTagsTable)
}));
