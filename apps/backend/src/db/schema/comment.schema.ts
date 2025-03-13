import { relations, sql } from 'drizzle-orm';
import { int, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { postsTable } from './posts.schema';
import { usersTable } from './users.schema';

export const commentsTable = sqliteTable('comments', {
  id: int().primaryKey({ autoIncrement: true }),
  postId: integer().references(() => postsTable.id),
  authorId: integer().references(() => usersTable.id),
  content: text().notNull(),
  createdAt: text().default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: text()
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`)
    .$onUpdate(() => sql`(CURRENT_TIMESTAMP)`),
});
export const commentsRelations = relations(commentsTable, ({ one }) => ({
  author: one(usersTable, {
    fields: [commentsTable.authorId],
    references: [usersTable.id],
  }),
  post: one(postsTable, {
    fields: [commentsTable.postId],
    references: [postsTable.id],
  }),
}));
