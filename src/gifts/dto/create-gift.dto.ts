import { z } from 'zod';

export const CreateGiftSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  stock: z.number(),
  rating: z.number().lte(5).gte(0),
});

export type CreateGiftDto = z.infer<typeof CreateGiftSchema>;
