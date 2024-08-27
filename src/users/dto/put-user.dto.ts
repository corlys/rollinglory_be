import { z } from 'zod';
import { CreateUserSchema } from './create-user.dto';

export const PutUserSchema = CreateUserSchema;

export type PutUserDto = z.infer<typeof PutUserSchema>;
