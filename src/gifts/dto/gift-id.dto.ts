import { z } from 'zod';

export const GiftParamIdSchema = z.object({
  id: z.string().min(1),
});

export type GiftParamIdDto = z.infer<typeof GiftParamIdSchema>;
