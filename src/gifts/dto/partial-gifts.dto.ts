import { z } from 'zod';
import { GiftSchema } from './gift.dto';

export const PartialGiftSchema = GiftSchema.partial();

export type PartialGiftDto = z.infer<typeof PartialGiftSchema>;
