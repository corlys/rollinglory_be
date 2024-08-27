import { Module } from '@nestjs/common';
import { GiftsService } from './gifts.service';
import { GiftsController } from './gifts.controller';
import { DrizzleModule } from '../drizzle/drizzle.module';
import { AuthModule } from '../auth/auth.module';
import { RolesGuard } from 'src/role/roles.guard';

@Module({
  controllers: [GiftsController],
  imports: [DrizzleModule, AuthModule],
  providers: [GiftsService, RolesGuard],
})
export class GiftsModule {}
