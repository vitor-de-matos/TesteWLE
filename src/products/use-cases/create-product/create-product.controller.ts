import { Body, Controller, Inject, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateProductUseCase } from './create-product.service';
import { CreateProductDTO } from 'src/products/models/dtos/create-product.dto';
import { Product } from 'src/products/models/entity/product.entity';

@ApiTags('Product')
@Controller('product')
export class CreateProductController {
  constructor(
    @Inject(CreateProductUseCase)
    private readonly createProdutService: CreateProductUseCase,
  ) {}

  @ApiOperation({ summary: 'Adicionar produto' })
  @ApiBody({ type: CreateProductDTO })
  @ApiCreatedResponse({ type: Number })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno entre em contato com o suporte.',
  })
  @Post()
  async create(@Body() productDTO: CreateProductDTO): Promise<Product> {
    return await this.createProdutService.create(productDTO);
  }
}
