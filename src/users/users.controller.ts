import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  UsePipes,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipes';
import { CreateUserDto, CreateUserSchema } from './dto/create-user.dto';
import { ParamUserIdDto, ParamUserIdSchema } from './dto/param-user-id.dto';
import { PutUserDto, PutUserSchema } from './dto/put-user.dto';
import {
  FETCH_SUCCESSFUL,
  PUT_SUCCESSFUL,
  DELETE_SUCCESSFUL,
  CREATE_SUCCESSFUL,
} from '../common/messages';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll() {
    const users = await this.usersService.findAll();
    return {
      code: 200,
      message: FETCH_SUCCESSFUL,
      data: users,
    };
  }

  @Get('/:id')
  @UsePipes(new ZodValidationPipe(ParamUserIdSchema))
  async findById(@Param() param: ParamUserIdDto) {
    const { id } = param;
    const user = await this.usersService.findById(parseInt(id));
    return {
      code: 200,
      message: FETCH_SUCCESSFUL,
      data: user,
    };
  }

  @Delete('/:id')
  @UsePipes(new ZodValidationPipe(ParamUserIdSchema))
  async delete(@Param() param: ParamUserIdDto) {
    const { id } = param;
    const deletedIds = await this.usersService.delete(parseInt(id));
    return {
      code: 200,
      message: DELETE_SUCCESSFUL,
      data: deletedIds,
    };
  }

  @Put('/:id')
  async put(
    @Param(new ZodValidationPipe(ParamUserIdSchema)) param: ParamUserIdDto,
    @Body(new ZodValidationPipe(PutUserSchema)) body: PutUserDto,
  ) {
    const { id } = param;
    await this.usersService.put(parseInt(id), body);
    return {
      code: 201,
      message: PUT_SUCCESSFUL,
    };
  }

  @HttpCode(201)
  @Post()
  @UsePipes(new ZodValidationPipe(CreateUserSchema))
  async createUser(@Body() body: CreateUserDto) {
    const { name, password } = body;
    const createdIds = await this.usersService.create(name, password);
    return {
      code: 201,
      message: CREATE_SUCCESSFUL,
      data: createdIds,
    };
  }
}
