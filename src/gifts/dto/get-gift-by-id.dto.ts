import { z } from 'zod';

export const GetGiftByIdSchema = z.object({
  id: z.string().min(1),
});

export type GetGiftByIdDto = z.infer<typeof GetGiftByIdSchema>;
