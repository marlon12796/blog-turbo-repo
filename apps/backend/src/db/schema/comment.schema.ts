import { relations, sql } from 'drizzle-orm';
import { int, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { postsTable } from './posts.schema';
import { usersTable } from './users.schema';

export const commentsTable = sqliteTable('comments', {
  id: int().primaryKey({ autoIncrement: true }),
  postId: integer().references(() => postsTable.id),
  authorId: integer().references(() => usersTable.id),
  content: text().notNull(),
  createdAt: integer({ mode: 'timestamp' }).default(sql`(unixepoch())`),
  updatedAt: integer({ mode: 'timestamp' })
    .notNull()
    .default(sql`(unixepoch())`)
    .$onUpdate(() => sql`(unixepoch())`)
});
export const commentsRelations = relations(commentsTable, ({ one }) => ({
  author: one(usersTable, {
    fields: [commentsTable.authorId],
    references: [usersTable.id]
  }),
  post: one(postsTable, {
    fields: [commentsTable.postId],
    references: [postsTable.id]
  })
}));
