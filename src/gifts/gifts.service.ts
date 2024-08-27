import { Inject, Injectable } from '@nestjs/common';
import { PG_CONNECTION } from '../constant';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../drizzle/schema';
import { Gift, NewGift } from '../drizzle/schema/gifts';
import { eq, desc, asc } from 'drizzle-orm';

@Injectable()
export class GiftsService {
  constructor(
    @Inject(PG_CONNECTION) private conn: NodePgDatabase<typeof schema>,
  ) {}
  async findAll(
    sortBy?: string,
    sort?: string,
    limit?: number,
    offset?: number,
  ) {
    const gifts = await this.conn.query.gifts.findMany({
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
      limit: limit ? limit : undefined,
      offset: offset ? offset : undefined,
    });
    return gifts.map((gift) => this.calculateStars(gift));
  }

  async findOne(id: number) {
    const gift = await this.conn.query.gifts.findFirst({
      where: eq(schema.gifts.id, id),
    });
    if (!gift) return undefined;
    return this.calculateStars(gift);
  }

  async create(newGift: NewGift) {
    return this.conn
      .insert(schema.gifts)
      .values(newGift)
      .returning({ createdId: schema.gifts.id });
  }

  private calculateStars(gift: Gift) {
    let star = 0;
    const diff = gift.rating % 0.5;
    if (diff > 0.3) star = gift.rating - diff + 0.5;
    else star = gift.rating - diff;
    return { ...gift, star };
  }
}
