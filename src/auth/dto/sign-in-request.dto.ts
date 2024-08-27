import { z } from 'zod';

export const SignInRequestSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export type SignInRequestDto = z.infer<typeof SignInRequestSchema>;
