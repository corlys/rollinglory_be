import { z } from 'zod';
import { CreateUserSchema } from './create-user.dto';

export const PatchUserSchema = CreateUserSchema.partial();

export type PatchUserDto = z.infer<typeof PatchUserSchema>;
