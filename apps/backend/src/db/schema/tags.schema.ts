import { relations } from 'drizzle-orm';
import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { postTagsTable } from './posts-tags.schema';

export const tagsTable = sqliteTable('tags', {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull().unique()
});
export const tagsRelations = relations(tagsTable, ({ many }) => ({
  postsToTags: many(postTagsTable)
}));
