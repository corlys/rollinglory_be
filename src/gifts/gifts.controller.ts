import {
  Controller,
  Get,
  Param,
  Query,
  Post,
  Body,
  UsePipes,
  Delete,
  Put,
  Patch,
} from '@nestjs/common';
import { GiftsService } from './gifts.service';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipes';
import { CreateGiftDto, CreateGiftSchema } from './dto/create-gift.dto';
import { GetGiftsDto, GetGiftsSchema } from './dto/get-gifts.dto';
import { GetGiftByIdDto, GetGiftByIdSchema } from './dto/get-gift-by-id.dto';
import { DeleteGiftDto, DeleteGiftSchema } from './dto/delete-gift.dto';

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
  @UsePipes(new ZodValidationPipe(GetGiftByIdSchema))
  async findOne(@Param() param: GetGiftByIdDto) {
    const { id } = param;
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

  @Delete('/:id')
  @UsePipes(new ZodValidationPipe(DeleteGiftSchema))
  async delete(@Param() deleteGiftDto: DeleteGiftDto) {
    const { id } = deleteGiftDto;
    const deletedId = await this.giftsService.delete(parseInt(id));
    return {
      data: deletedId,
    };
  }
}
