import { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import * as schema from '../schema/db.schema';
import { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';
export type DBSetup = BetterSQLite3Database<typeof schema>;
export type UserTable = InferSelectModel<typeof schema.usersTable>;
export type LikesTable = InferSelectModel<typeof schema.likesTable>;
export type CommentsTable = InferSelectModel<typeof schema.commentsTable>;
export type PostsTable = InferSelectModel<typeof schema.postsTable>;
export type UserTableInsert = InferInsertModel<typeof schema.usersTable>;
export enum AuthType {
  GOOGLE = 'GOOGLE',
  LOCAL = 'LOCAL'
}
