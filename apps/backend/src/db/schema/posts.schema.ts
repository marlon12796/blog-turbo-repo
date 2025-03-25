import { relations, sql } from 'drizzle-orm';
import { int, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { usersTable } from './users.schema';
import { postTagsTable } from './posts-tags.schema';
import { commentsTable } from './comment.schema';

export const postsTable = sqliteTable('posts', {
  id: int().primaryKey({ autoIncrement: true }),
  slug: text().notNull().unique(),
  title: text().notNull(),
  content: text().notNull(),
  thumbnail: text(),
  authorId: integer().references(() => usersTable.id),
  published: integer({ mode: 'boolean' }),
  createdAt: integer({ mode: 'timestamp' })
    .default(sql`(unixepoch())`)
    .notNull(),
  updatedAt: integer({ mode: 'timestamp' })
    .default(sql`(unixepoch())`)
    .$onUpdateFn(() => new Date())
    .$type<Date>()
    .notNull()
});
export const postsRelations = relations(postsTable, ({ many, one }) => ({
  postsToTags: many(postTagsTable),
  comments: many(commentsTable),
  author: one(usersTable, {
    fields: [postsTable.authorId],
    references: [usersTable.id]
  })
}));
