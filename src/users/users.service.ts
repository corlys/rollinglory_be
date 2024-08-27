import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PG_CONNECTION } from '../constant';
import * as schema from '../drizzle/schema';
import { eq } from 'drizzle-orm';
import { PatchUserDto } from './dto/patch-user.dto';
import { PutUserDto } from './dto/put-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject(PG_CONNECTION) private conn: NodePgDatabase<typeof schema>,
  ) {}

  async findAll() {
    return this.conn.query.users.findMany({
      columns: {
        id: true,
        name: true,
      },
    });
  }

  async findByName(name: string) {
    return this.conn.query.users.findFirst({
      where: eq(schema.users.name, name),
    });
  }

  async findById(id: number) {
    return this.conn.query.users.findFirst({
      where: eq(schema.users.id, id),
    });
  }

  async saltPassword(password: string) {
    return await bcrypt.hash(password, 10);
  }

  async create(name: string, password: string) {
    const saltedPassword = await bcrypt.hash(password, 10);
    return this.conn
      .insert(schema.users)
      .values({
        name,
        saltedPassword,
        role: 'user',
      })
      .returning({
        createdId: schema.users.id,
      });
  }

  async delete(id: number) {
    return this.conn
      .delete(schema.users)
      .where(eq(schema.users.id, id))
      .returning({
        deletedId: schema.users.id,
      });
  }

  async patch(id: number, patchedUser: PatchUserDto) {
    return this.conn
      .update(schema.users)
      .set(patchedUser)
      .where(eq(schema.users.id, id))
      .returning({
        updatedId: schema.users.id,
      });
  }

  async put(id: number, putUser: PutUserDto) {
    return this.conn
      .update(schema.users)
      .set({
        name: putUser.name,
        saltedPassword: await this.saltPassword(putUser.password),
      })
      .where(eq(schema.users.id, id))
      .returning({
        updatedId: schema.users.id,
      });
  }

  verify(password: string, saltedPassword: string) {
    const verify = bcrypt.compareSync(password, saltedPassword);
    return verify;
  }
}
