import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { DrizzleModule } from '../drizzle/drizzle.module';
import { SharedJwtModule } from '../shared/jwt/jwt.module';

@Module({
  imports: [UsersModule, DrizzleModule, SharedJwtModule],
  providers: [AuthService],
  controllers: [AuthController],
  // exports: [AuthService],
})
export class AuthModule {}
