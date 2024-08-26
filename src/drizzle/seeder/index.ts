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

  const firstGift = await db.query.gifts.findFirst();
  if (!firstGift) {
    for (const gift of giftsData) {
      await db.insert(schema.gifts).values(gift);
    }
  } else {
    console.log('Seeder not needed');
  }

  console.log('Seeder finished');

  await pool.end();
};

runSeeder().catch((err) => console.log(err));
