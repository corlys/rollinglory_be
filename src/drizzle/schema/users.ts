import { pgTable, serial, text, varchar } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).unique().notNull(),
  saltedPassword: text('salted_password').notNull(),
});

export type User = typeof users.$inferSelect;
export type Newuser = typeof users.$inferInsert;

export default users;
