import { Body, Controller, Get, Inject } from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { FindAllProductUseCase } from './find-all-products.service';
import { FindProductDTO } from 'src/products/models/dtos/find-product.dto';
import { Product } from 'src/products/models/entity/product.entity';

@ApiTags('Product')
@Controller('product')
export class FindAllProductController {
  constructor(
    @Inject(FindAllProductUseCase)
    private readonly productService: FindAllProductUseCase,
  ) {}

  @ApiOperation({ summary: 'Buscar todos os produtos' })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno entre em contato com o suporte.',
  })
  @Get('all')
  async find(@Body() productDTO: FindProductDTO): Promise<{
    data: Product[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
  }> {
    const result = await this.productService.find(productDTO);
    return result;
  }
}
