import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PG_CONNECTION } from '../constant';
import * as schema from '../drizzle/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class UsersService {
  constructor(
    @Inject(PG_CONNECTION) private conn: NodePgDatabase<typeof schema>,
  ) {}

  async findByName(name: string) {
    return this.conn.query.users.findFirst({
      where: eq(schema.users.name, name),
    });
  }

  async create(name: string, password: string) {
    const saltedPassword = await bcrypt.hash(password, 10);
    return this.conn
      .insert(schema.users)
      .values({
        name,
        saltedPassword,
      })
      .returning({
        createdId: schema.users.id,
      });
  }
}
