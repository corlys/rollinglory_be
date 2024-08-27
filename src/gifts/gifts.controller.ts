import {
  Controller,
  Get,
  Param,
  Query,
  Post,
  Body,
  UsePipes,
} from '@nestjs/common';
import { GiftsService } from './gifts.service';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipes';
import { CreateGiftDto, CreateGiftSchema } from './dto/create-gift.dto';

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

  @Post()
  @UsePipes(new ZodValidationPipe(CreateGiftSchema))
  async create(@Body() createGiftDto: CreateGiftDto) {
    const createdId = await this.giftsService.create(createGiftDto);
    return {
      data: createdId,
    };
  }
}
