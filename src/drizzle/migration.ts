import * as dotenv from 'dotenv';
dotenv.config();

import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

import * as schema from './schema';

const runMigration = async () => {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  const db = drizzle(pool, { schema });

  console.log('Running migrations...');

  // const migrationPath = path.join(process.cwd(), 'src/drizzle/migrations');
  // console.log(migrationPath);

  await migrate(db, {
    migrationsFolder: './src/drizzle/migrations',
  });

  console.log('Migrations completed successfully');

  await pool.end();
};

runMigration().catch((err) => console.log(err));
