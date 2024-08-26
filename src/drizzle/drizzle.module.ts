import { Module } from '@nestjs/common';
import { drizzle, PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { ConfigService } from '@nestjs/config';

import * as schema from './schema';
import { PG_CONNECTION } from '../constant';

@Module({
  providers: [
    {
      provide: PG_CONNECTION,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const connectionString = configService.get<string>('DATABASE_URL');
        const client = postgres(connectionString ?? '');
        const db: PostgresJsDatabase<typeof schema> = drizzle(client, {
          schema,
        });
        return db;
      },
    },
  ],
  exports: [PG_CONNECTION],
})
export class DrizzleModule {}
