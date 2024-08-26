import { pgTable, integer, serial, varchar, text } from 'drizzle-orm/pg-core';

export const gifts = pgTable('gifts', {
  id: serial('id').primaryKey(),
  name: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  stock: integer('stock').notNull(),
  rating: integer('rating'),
});

export default gifts;
