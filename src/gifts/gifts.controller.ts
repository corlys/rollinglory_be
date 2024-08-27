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
  Logger,
} from '@nestjs/common';
import { GiftsService } from './gifts.service';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipes';
import { CreateGiftDto, CreateGiftSchema } from './dto/create-gift.dto';
import { GetGiftsDto, GetGiftsSchema } from './dto/get-gifts.dto';
import { GetGiftByIdDto, GetGiftByIdSchema } from './dto/get-gift-by-id.dto';
import { DeleteGiftDto, DeleteGiftSchema } from './dto/delete-gift.dto';
import { PutGiftBodyDto, PutGiftBodySchema } from './dto/put-gift.dto';
import { PatchGiftBodytSchema, PatchGiftBodyDto } from './dto/patch-gift.dto';

@Controller('gifts')
export class GiftsController {
  private readonly logger = new Logger(GiftsController.name);

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

  @Put('/:id')
  async put(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(PutGiftBodySchema)) body: PutGiftBodyDto,
  ) {
    const updatedId = await this.giftsService.put(parseInt(id), body);
    return {
      data: updatedId,
    };
  }

  @Patch('/:id')
  async patch(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(PatchGiftBodytSchema)) body: PatchGiftBodyDto,
  ) {
    this.logger.log('route reched');
    const updatedId = await this.giftsService.patch(parseInt(id), body);
    return {
      data: updatedId,
    };
  }
}
