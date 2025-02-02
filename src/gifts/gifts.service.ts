import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PG_CONNECTION } from '../constant';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../drizzle/schema';
import { Gift, NewGift } from '../drizzle/schema/gifts';
import { eq, desc, asc } from 'drizzle-orm';
import { GiftDto } from './dto/gift.dto';
import { PartialGiftDto } from './dto/partial-gifts.dto';
import { RedeemManyBodyDto } from './dto/redeem.dto';

@Injectable()
export class GiftsService {
  constructor(
    @Inject(PG_CONNECTION) private conn: NodePgDatabase<typeof schema>,
  ) {}
  async findAll(sortBy?: string, sort?: string, limit?: number, page?: number) {
    let offset = 0;
    if (page && limit) {
      offset = (page - 1) * limit;
    }
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

  async delete(id: number) {
    return this.conn
      .delete(schema.gifts)
      .where(eq(schema.gifts.id, id))
      .returning({
        deletedId: schema.gifts.id,
      });
  }

  async patch(id: number, patchGift: PartialGiftDto) {
    const gift = {
      ...patchGift,
      updatedAt: new Date(),
    };
    return this.conn
      .update(schema.gifts)
      .set(gift)
      .where(eq(schema.gifts.id, id))
      .returning({
        updatedId: schema.gifts.id,
      });
  }
  async put(id: number, putGift: GiftDto) {
    const gift = {
      ...putGift,
      updatedAt: new Date(),
    };
    return this.conn
      .update(schema.gifts)
      .set(gift)
      .where(eq(schema.gifts.id, id))
      .returning({
        updatedId: schema.gifts.id,
      });
  }

  async redeem(id: number, count: number) {
    const gift = await this.findOne(id);
    if (!gift) throw new NotFoundException('Gift Not Found');
    if (gift.stock >= count) {
      return await this.patch(id, { stock: gift.stock - count });
    } else {
      throw new ForbiddenException('Stock is less than count');
    }
  }

  async redeemMany(body: RedeemManyBodyDto) {
    const { items } = body;
    await this.conn.transaction(async (tx) => {
      for (const item of items) {
        const gift = await tx.query.gifts.findFirst({
          where: eq(schema.users.id, item.id),
        });
        if (!gift) {
          throw new NotFoundException('Gift not found');
        }
        if (gift.stock >= item.count) {
          await tx
            .update(schema.gifts)
            .set({ stock: gift.stock - item.count })
            .where(eq(schema.gifts.id, item.id));
        } else {
          throw new ForbiddenException('Stock is Less than count');
        }
      }
    });
  }

  private calculateStars(gift: Gift) {
    let star = 0;
    const diff = gift.rating % 0.5;
    if (diff > 0.3) star = gift.rating - diff + 0.5;
    else star = gift.rating - diff;
    return { ...gift, star };
  }
}
