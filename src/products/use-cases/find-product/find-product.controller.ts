import {
  Controller,
  Inject,
  Get,
  Param,
  BadRequestException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiNotAcceptableResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { FindProductUseCase } from './find-product.service';
import { Product } from 'src/products/models/entity/product.entity';

@ApiTags('Product')
@Controller('product')
export class FindProductController {
  constructor(
    @Inject(FindProductUseCase)
    private readonly productService: FindProductUseCase,
  ) {}

  @ApiOperation({ summary: 'Busca produto por ID' })
  @ApiOkResponse({ description: 'Produto encontrado' })
  @ApiNotAcceptableResponse({ description: 'Id inválido.' })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno entre em contato com o suporte.',
  })
  @Get(':id')
  async find(@Param('id') id: number): Promise<Product> {
    if (isNaN(id)) {
      throw new BadRequestException('Id inválido');
    }
    return await this.productService.find(id);
  }
}
