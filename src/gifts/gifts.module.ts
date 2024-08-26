import { Module } from '@nestjs/common';
import { GiftsService } from './gifts.service';
import { GiftsController } from './gifts.controller';
import { DrizzleModule } from '../drizzle/drizzle.module';

@Module({
  controllers: [GiftsController],
  imports: [DrizzleModule],
  providers: [GiftsService],
})
export class GiftsModule {}
