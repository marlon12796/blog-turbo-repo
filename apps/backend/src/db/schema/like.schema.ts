import { relations, sql } from 'drizzle-orm';
import { int, unique, sqliteTable, integer } from 'drizzle-orm/sqlite-core';

import { postsTable } from './posts.schema';
import { usersTable } from './users.schema';

export const likesTable = sqliteTable(
  'likes',
  {
    id: int().primaryKey({ autoIncrement: true }),
    postId: int().references(() => postsTable.id),
    userId: int().references(() => usersTable.id),
    liked: integer({ mode: 'boolean' }).default(true),
    createdAt: integer({ mode: 'timestamp' }).default(sql`(unixepoch())`)
  },
  (t) => [unique('unique_like').on(t.userId, t.postId)]
);

export const likesRelations = relations(likesTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [likesTable.userId],
    references: [usersTable.id]
  }),
  likedPost: one(postsTable, {
    fields: [likesTable.postId],
    references: [postsTable.id]
  })
}));
