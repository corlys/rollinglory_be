import { Controller, Get, Post, Body, UsePipes } from '@nestjs/common';
import { UsersService } from './users.service';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipes';
import { CreateUserDto, CreateUserSchema } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll() {
    const users = await this.usersService.findAll();
    return {
      code: 200,
      message: 'success',
      data: users,
    };
  }

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
