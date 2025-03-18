import { relations, sql } from 'drizzle-orm';
import { int, sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { postsTable } from './posts.schema';
import { likesTable } from './like.schema';
import { commentsTable } from './comment.schema';

export const usersTable = sqliteTable('users', {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  email: text().notNull().unique(),
  bio: text(),
  avatar: text(),
  authType: text({ enum: ['GOOGLE', 'LOCAL'] })
    .default('LOCAL')
    .notNull(),
  password: text(),
  createdAt: integer({ mode: 'timestamp' }).default(sql`(unixepoch())`),
  updatedAt: integer({ mode: 'timestamp' })
    .notNull()
    .default(sql`(unixepoch())`)
    .$onUpdate(() => sql`(unixepoch())`)
});
export const usersRelations = relations(usersTable, ({ many }) => ({
  posts: many(postsTable),
  likes: many(likesTable),
  comments: many(commentsTable)
}));
