import * as schema from '../schema/db.schema';
import { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';

export type DBSetup = BetterSQLite3Database<typeof schema>;
