import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DrizzleModule } from 'src/drizzle/drizzle.module';
import { SharedJwtModule } from 'src/shared/jwt/jwt.module';

@Module({
  controllers: [UsersController],
  imports: [DrizzleModule, SharedJwtModule],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
