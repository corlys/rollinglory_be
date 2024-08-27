import { z } from 'zod';

export const CreateUserSchema = z.object({
  name: z.string().min(1),
  password: z.string().min(1),
});

export type CreateUserDto = z.infer<typeof CreateUserSchema>;
