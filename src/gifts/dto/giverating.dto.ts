import { z } from 'zod';

export const GiveRatingBodySchema = z.object({
  rating: z.number().gte(0).lte(5),
});

export type GiveRatingBodyDto = z.infer<typeof GiveRatingBodySchema>;
