import { Inject, Injectable } from '@nestjs/common';
import { PG_CONNECTION } from '../constant';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import * as schema from '../drizzle/schema';

@Injectable()
export class GiftsService {
  constructor(
    @Inject(PG_CONNECTION) private conn: PostgresJsDatabase<typeof schema>,
  ) {}
  async findAll() {
    return await this.conn.query.gifts.findMany();
  }
}
