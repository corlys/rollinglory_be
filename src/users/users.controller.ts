import { Controller, Post, Body, UsePipes } from '@nestjs/common';
import { UsersService } from './users.service';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipes';
import { CreateUserDto, CreateUserSchema } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(CreateUserSchema))
  async createUser(@Body() body: CreateUserDto) {
    const { name, password } = body;
    const createdIds = await this.usersService.create(name, password);
    return {
      data: createdIds,
    };
  }
}
