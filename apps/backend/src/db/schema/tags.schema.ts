import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const tagsTable = sqliteTable('tags', {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull().unique(),
});
