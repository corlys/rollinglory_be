import {
  pgTable,
  integer,
  serial,
  varchar,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';

export const gifts = pgTable('gifts', {
  id: serial('id').primaryKey(),
  name: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  stock: integer('stock').notNull().default(0),
  rating: integer('rating').notNull().default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type Gift = typeof gifts.$inferSelect; // return type when queried
export type NewGift = typeof gifts.$inferInsert; // insert type

export default gifts;
