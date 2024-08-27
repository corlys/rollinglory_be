import { z } from 'zod';

export const PutGiftBodySchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  rating: z.number(),
  stock: z.number(),
});

export type PutGiftBodyDto = z.infer<typeof PutGiftBodySchema>;
