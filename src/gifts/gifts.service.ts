import { Inject, Injectable } from '@nestjs/common';
import { PG_CONNECTION } from '../constant';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../drizzle/schema';
import { eq, desc, asc } from 'drizzle-orm';

@Injectable()
export class GiftsService {
  constructor(
    @Inject(PG_CONNECTION) private conn: NodePgDatabase<typeof schema>,
  ) {}
  async findAll(sortBy?: string, sort?: string) {
    return this.conn.query.gifts.findMany({
      orderBy: (() => {
        switch (sortBy) {
          case 'new':
            switch (sort) {
              case 'desc':
                return [desc(schema.gifts.createdAt)];
              case 'asc':
                return [asc(schema.gifts.createdAt)];
              default:
                return [desc(schema.gifts.createdAt)];
            }
          case 'rating':
            switch (sort) {
              case 'desc':
                return [desc(schema.gifts.rating)];
              case 'asc':
                return [asc(schema.gifts.rating)];
              default:
                return [desc(schema.gifts.rating)];
            }
          default:
            return [desc(schema.gifts.updatedAt)];
        }
      })(),
    });
  }

  async findOne(id: number) {
    return this.conn.query.gifts.findFirst({
      where: eq(schema.gifts.id, id),
    });
  }
}
