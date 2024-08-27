import { Module } from '@nestjs/common';
import { GiftsService } from './gifts.service';
import { GiftsController } from './gifts.controller';
import { DrizzleModule } from '../drizzle/drizzle.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [GiftsController],
  imports: [DrizzleModule, AuthModule],
  providers: [GiftsService],
})
export class GiftsModule {}
