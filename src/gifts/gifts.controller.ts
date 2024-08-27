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
import { GetGiftsDto, GetGiftsSchema } from './dto/get-gifts.dto';

@Controller('gifts')
export class GiftsController {
  constructor(private readonly giftsService: GiftsService) {}

  @Get()
  @UsePipes(new ZodValidationPipe(GetGiftsSchema))
  async findAll(@Query() query: GetGiftsDto) {
    const { sortBy, sort, page, limit } = query;
    let offset = 0;
    if (page && limit) {
      offset = (parseInt(page) - 1) * parseInt(limit);
    }
    const gifts = await this.giftsService.findAll(
      sortBy,
      sort,
      limit ? parseInt(limit) : undefined,
      offset,
    );
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
