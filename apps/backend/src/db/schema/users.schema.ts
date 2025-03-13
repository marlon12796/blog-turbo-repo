import { relations, sql } from 'drizzle-orm';
import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { postsTable } from './posts.schema';
import { likesTable } from './like.schema';
import { commentsTable } from './comment.schema';

export const usersTable = sqliteTable('users', {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  email: text().notNull().unique(),
  password: text().notNull(),
  createdAt: text().default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: text()
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`)
    .$onUpdate(() => sql`(CURRENT_TIMESTAMP)`),
});
export const usersRelations = relations(usersTable, ({ many }) => ({
  posts: many(postsTable),
  likes: many(likesTable),
  comments: many(commentsTable),
}));
