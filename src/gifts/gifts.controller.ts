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
  ForbiddenException,
  HttpCode,
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
import {
  FETCH_SUCCESSFUL,
  PUT_SUCCESSFUL,
  PATCH_SUCCESSFUL,
  DELETE_SUCCESSFUL,
  CREATE_SUCCESSFUL,
  REDEEM_SUCCESSFUL,
} from '../common/messages';

@Controller('gifts')
export class GiftsController {
  private readonly logger = new Logger(GiftsController.name);

  constructor(private readonly giftsService: GiftsService) {}

  @Get()
  @UsePipes(new ZodValidationPipe(GetGiftsSchema))
  async findAll(@Query() query: GetGiftsDto) {
    const { sortBy, sort, page, limit } = query;
    const gifts = await this.giftsService.findAll(
      sortBy,
      sort,
      parseInt(limit || '0'),
      parseInt(page || '0'),
    );
    return {
      code: 200,
      message: FETCH_SUCCESSFUL,
      data: gifts,
    };
  }

  @Get('/:id')
  @UsePipes(new ZodValidationPipe(GiftParamIdSchema))
  async findOne(@Param() param: GiftParamIdDto) {
    const { id } = param;
    const gift = await this.giftsService.findOne(parseInt(id));
    return {
      code: 200,
      message: FETCH_SUCCESSFUL,
      data: gift,
    };
  }

  @HttpCode(201)
  @Post()
  @UsePipes(new ZodValidationPipe(CreateGiftSchema))
  async create(@Body() createGiftDto: CreateGiftDto) {
    const createdId = await this.giftsService.create(createGiftDto);
    return {
      code: 201,
      message: CREATE_SUCCESSFUL,
      data: createdId,
    };
  }

  @Delete('/:id')
  @UsePipes(new ZodValidationPipe(GiftParamIdSchema))
  async delete(@Param() deleteGiftDto: GiftParamIdDto) {
    const { id } = deleteGiftDto;
    const deletedId = await this.giftsService.delete(parseInt(id));
    return {
      code: 200,
      message: DELETE_SUCCESSFUL,
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
      code: 200,
      message: PUT_SUCCESSFUL,
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
      code: 200,
      message: PATCH_SUCCESSFUL,
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
      code: 200,
      message: PATCH_SUCCESSFUL,
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
    await this.giftsService.redeem(parseInt(id), count);
    return {
      code: 201,
      message: REDEEM_SUCCESSFUL,
    };
  }

  @Post('/redeem')
  async redeemMany(
    @Body(new ZodValidationPipe(RedeemManyBodySchema)) body: RedeemManyBodyDto,
  ) {
    await this.giftsService.redeemMany(body);
    return {
      code: 201,
      message: REDEEM_SUCCESSFUL,
    };
  }
}
