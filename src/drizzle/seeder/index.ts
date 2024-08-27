import * as dotenv from 'dotenv';
dotenv.config();

import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

import * as schema from '../schema';
import { giftsData } from './data';

const runSeeder = async () => {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  const db = drizzle(pool, { schema });

  console.log('Running seeder...');

  await db.delete(schema.gifts);

  for (const gift of giftsData) {
    await db.insert(schema.gifts).values(gift);
  }

  console.log('Seeder finished');

  await pool.end();
};

runSeeder().catch((err) => console.log(err));
