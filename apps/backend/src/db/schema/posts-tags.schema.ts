import { int, sqliteTable, unique } from 'drizzle-orm/sqlite-core';

import { postsTable } from './posts.schema';
import { tagsTable } from './tags.schema';

export const postTagsTable = sqliteTable(
  'post_tags',
  {
    postId: int()
      .notNull()
      .references(() => postsTable.id),
    tagId: int()
      .notNull()
      .references(() => tagsTable.id),
  },
  (t) => [unique('unique_post_tag').on(t.postId, t.tagId)],
);
