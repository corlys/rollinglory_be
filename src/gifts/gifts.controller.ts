import { Controller, Get } from '@nestjs/common';
import { GiftsService } from './gifts.service';

@Controller('gifts')
export class GiftsController {
  constructor(private readonly giftsService: GiftsService) {}

  @Get()
  async findAll() {
    return this.giftsService.findAll();
  }
}
