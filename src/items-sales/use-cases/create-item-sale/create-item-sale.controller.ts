import { Body, Controller, Inject, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateProductDTO } from 'src/products/models/dtos/create-product.dto';
import { Product } from 'src/products/models/entity/product.entity';
import { CreateItemSaleUseCase } from './create-item-sale.service';
import { ItemSales } from 'src/items-sales/models/entity/items-sale.entity';

@ApiTags('Item Sale')
@Controller('item_sale')
export class CreateItemSaleController {
  constructor(
    @Inject(CreateItemSaleUseCase)
    private readonly createItemSaleService: CreateItemSaleUseCase,
  ) {}

  @ApiOperation({ summary: 'Adicionar produto' })
  @ApiBody({ type: CreateProductDTO })
  @ApiCreatedResponse({ type: Number })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno entre em contato com o suporte.',
  })
  @Post()
  async create(@Body() productDTO: CreateProductDTO): Promise<ItemSales> {
    return await this.createItemSaleService.create(productDTO);
  }
}
