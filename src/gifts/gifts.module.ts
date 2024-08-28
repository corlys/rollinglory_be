import { Module } from '@nestjs/common';
import { GiftsService } from './gifts.service';
import { GiftsController } from './gifts.controller';
import { DrizzleModule } from '../drizzle/drizzle.module';
import { RolesGuard } from 'src/role/roles.guard';
import { SharedJwtModule } from '../shared/jwt/jwt.module';

@Module({
  controllers: [GiftsController],
  imports: [DrizzleModule, SharedJwtModule],
  providers: [GiftsService, RolesGuard],
})
export class GiftsModule {}
