import { z } from 'zod';

export const GiftSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  rating: z.number().lte(5).gte(0),
  stock: z.number(),
});

export type GiftDto = z.infer<typeof GiftSchema>;
