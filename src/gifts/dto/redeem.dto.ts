import { z } from 'zod';

export const RedeemBodySchema = z.object({
  count: z.number().gt(0),
});

export const RedeemManyBodySchema = z.object({
  items: z.array(
    RedeemBodySchema.extend({
      id: z.number(),
    }),
  ),
});

export type RedeemBodyDto = z.infer<typeof RedeemBodySchema>;
export type RedeemManyBodyDto = z.infer<typeof RedeemManyBodySchema>;
