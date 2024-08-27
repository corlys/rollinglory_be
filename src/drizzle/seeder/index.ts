import * as dotenv from 'dotenv';
dotenv.config();

import * as bcrypt from 'bcrypt';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

import * as schema from '../schema';
import { giftsData, usersData } from './data';

const runSeeder = async () => {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  const db = drizzle(pool, { schema });
  const salt = await bcrypt.genSalt();

  console.log('Running seeder...');

  // await db.delete(schema.gifts);

  const gift = await db.query.gifts.findFirst();
  if (!gift) {
    for (const gift of giftsData) {
      await db.insert(schema.gifts).values(gift);
    }
  }

  const user = await db.query.users.findFirst();
  if (!user) {
    for (const user of usersData) {
      const hashedPass = await bcrypt.hash(user.password, salt);
      await db.insert(schema.users).values({
        name: user.name,
        saltedPassword: hashedPass,
      });
    }
  }

  console.log('Seeder finished');

  await pool.end();
};

runSeeder().catch((err) => console.log(err));
