import {
  Body,
  Controller,
  Post,
  Get,
  HttpCode,
  HttpStatus,
  UsePipes,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipes';
import {
  SignInRequestSchema,
  SignInRequestDto,
} from './dto/sign-in-request.dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @UsePipes(new ZodValidationPipe(SignInRequestSchema))
  async signIn(@Body() signInDto: SignInRequestDto) {
    const signIn = await this.authService.signIn(
      signInDto.username,
      signInDto.password,
    );
    return {
      code: 200,
      message: 'Successfully Login',
      data: signIn,
    };
  }

  @UseGuards(AuthGuard)
  @Get('/protected')
  getProtected() {
    return {
      code: 200,
      message: 'This is protected',
      data: {},
    };
  }
}
