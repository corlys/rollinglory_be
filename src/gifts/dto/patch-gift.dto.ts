import { z } from 'zod';
import { PutGiftBodySchema } from './put-gift.dto';

export const PatchGiftBodytSchema = PutGiftBodySchema.partial();

export type PatchGiftBodyDto = z.infer<typeof PatchGiftBodytSchema>;
