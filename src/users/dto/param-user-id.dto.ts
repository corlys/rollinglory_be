import { z } from 'zod';

export const ParamUserIdSchema = z.object({
  id: z.string().min(1),
});

export type ParamUserIdDto = z.infer<typeof ParamUserIdSchema>;
