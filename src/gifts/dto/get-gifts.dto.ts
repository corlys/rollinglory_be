import { z } from 'zod';

export const GetGiftsSchema = z.object({
  sort: z.string().optional(),
  sortBy: z.string().optional(),
  page: z.string().optional(),
  limit: z.string().optional(),
});

export type GetGiftsDto = z.infer<typeof GetGiftsSchema>;
