import { Controller, Get, Param, Query } from '@nestjs/common';
import { GiftsService } from './gifts.service';

@Controller('gifts')
export class GiftsController {
  constructor(private readonly giftsService: GiftsService) {}

  @Get()
  async findAll(@Query('sort') sort: string, @Query('sortBy') sortBy: string) {
    const gifts = await this.giftsService.findAll(sortBy, sort);
    return {
      data: gifts,
    };
  }

  @Get('/:id')
  async findOne(@Param('id') id: string) {
    const gift = await this.giftsService.findOne(parseInt(id));
    return {
      data: gift,
    };
  }
}
