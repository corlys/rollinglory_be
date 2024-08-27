import { z } from 'zod';
import { PutGiftBodySchema } from './put-gift.dto';

export const PatchGifBodytSchema = PutGiftBodySchema.partial();

export type PatchGiftBodyDto = z.infer<typeof PatchGifBodytSchema>;
