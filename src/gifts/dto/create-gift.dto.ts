import { z } from 'zod';

export const CreateGiftSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  stock: z.number(),
  rating: z.number(),
});

export type CreateGiftDto = z.infer<typeof CreateGiftSchema>;
