import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import dbConfig from 'src/common/config/db.config';
import * as Database from 'better-sqlite3';
import * as schema from './schema/db.schema';
import { drizzle } from 'drizzle-orm/better-sqlite3';
export const DB = Symbol('DB-CONNECTION');
@Module({
  imports: [ConfigModule.forFeature(dbConfig)],
  providers: [
    {
      provide: DB,
      inject: [ConfigService],
      useFactory: (dbConfig: ConfigService) => {
        const url: string = dbConfig.get('db.DATABASE_URL');
        const sqlite = new Database(url);
        const db = drizzle({ client: sqlite, schema });
        return db;
      }
    }
  ],
  exports: [DB]
})
export class DbModule {}
