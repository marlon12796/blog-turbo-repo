import { int, primaryKey, sqliteTable } from 'drizzle-orm/sqlite-core';

import { postsTable } from './posts.schema';
import { tagsTable } from './tags.schema';
import { relations } from 'drizzle-orm';

export const postTagsTable = sqliteTable(
  'post_tags',
  {
    postId: int()
      .notNull()
      .references(() => postsTable.id),
    tagId: int()
      .notNull()
      .references(() => tagsTable.id)
  },
  (t) => [
    primaryKey({
      columns: [t.postId, t.tagId]
    })
  ]
);
export const postTagsRelations = relations(postTagsTable, ({ one }) => ({
  post: one(postsTable, {
    fields: [postTagsTable.postId],
    references: [postsTable.id]
  }),
  tag: one(tagsTable, {
    fields: [postTagsTable.tagId],
    references: [tagsTable.id]
  })
}));
