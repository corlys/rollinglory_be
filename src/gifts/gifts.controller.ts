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
import { GiftParamIdSchema, GiftParamIdDto } from './dto/gift-id.dto';
import { GiftSchema, GiftDto } from './dto/gift.dto';
import { PartialGiftSchema, PartialGiftDto } from './dto/partial-gifts.dto';
import { GiveRatingBodyDto, GiveRatingBodySchema } from './dto/giverating.dto';
import {
  RedeemBodyDto,
  RedeemBodySchema,
  RedeemManyBodyDto,
  RedeemManyBodySchema,
} from './dto/redeem.dto';

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
  @UsePipes(new ZodValidationPipe(GiftParamIdSchema))
  async findOne(@Param() param: GiftParamIdDto) {
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
  @UsePipes(new ZodValidationPipe(GiftParamIdSchema))
  async delete(@Param() deleteGiftDto: GiftParamIdDto) {
    const { id } = deleteGiftDto;
    const deletedId = await this.giftsService.delete(parseInt(id));
    return {
      data: deletedId,
    };
  }

  @Put('/:id')
  async put(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(GiftSchema)) body: GiftDto,
  ) {
    const updatedId = await this.giftsService.put(parseInt(id), body);
    return {
      data: updatedId,
    };
  }

  @Patch('/:id')
  async patch(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(PartialGiftSchema)) body: PartialGiftDto,
  ) {
    this.logger.log('route reched');
    const updatedId = await this.giftsService.patch(parseInt(id), body);
    return {
      data: updatedId,
    };
  }

  @Post('/:id/rating')
  async rate(
    @Param(new ZodValidationPipe(GiftParamIdSchema)) param: GiftParamIdDto,
    @Body(new ZodValidationPipe(GiveRatingBodySchema)) body: GiveRatingBodyDto,
  ) {
    const { id } = param;
    const { rating } = body;
    const updatedId = await this.giftsService.patch(parseInt(id), { rating });
    return {
      data: updatedId,
    };
  }

  @Post('/:id/redeem')
  async redeem(
    @Param(new ZodValidationPipe(GiftParamIdSchema)) param: GiftParamIdDto,
    @Body(new ZodValidationPipe(RedeemBodySchema)) body: RedeemBodyDto,
  ) {
    const { count } = body;
    const { id } = param;
    const gift = await this.giftsService.findOne(parseInt(id));
    if (!gift) return { data: [] };
    if (gift.stock >= count) {
      const updatedId = await this.giftsService.patch(parseInt(id), {
        stock: gift.stock - count,
      });
      return {
        data: updatedId,
      };
    }
    return {
      data: [],
    };
  }

  @Post('/redeem')
  async redeemMany(
    @Body(new ZodValidationPipe(RedeemManyBodySchema)) body: RedeemManyBodyDto,
  ) {
    const { items } = body;
    const updatedIds: { updatedId: number }[] = [];
    for (const item of items) {
      const { id, count } = item;
      const gift = await this.giftsService.findOne(id);
      if (!gift) continue;
      if (gift.stock >= count) {
        await this.giftsService.patch(id, { stock: gift.stock - count });
        updatedIds.push({
          updatedId: id,
        });
      }
    }
    return {
      data: updatedIds,
    };
  }
}
