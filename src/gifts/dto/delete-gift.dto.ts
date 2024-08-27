import { z } from 'zod';

export const DeleteGiftSchema = z.object({
  id: z.string().min(1),
});

export type DeleteGiftDto = z.infer<typeof DeleteGiftSchema>;
