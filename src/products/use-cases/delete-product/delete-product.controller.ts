import { Controller, Delete, Inject, Param } from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiNotAcceptableResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { DeleteProductUseCase } from './delete-product.service';

@ApiTags('Product')
@Controller('product')
export class DeleteProductController {
  constructor(
    @Inject(DeleteProductUseCase)
    private readonly productService: DeleteProductUseCase,
  ) {}

  @ApiOperation({ summary: 'Excluir um produto' })
  @ApiOkResponse({ description: 'Produto removido com sucesso' })
  @ApiNotFoundResponse({ description: 'Produto não encontrado.' })
  @ApiNotAcceptableResponse({ description: 'Id inválido.' })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno entre em contato com o suporte.',
  })
  @Delete()
  async delete(@Param() id: number): Promise<string> {
    const result = await this.productService.delete(id);
    return result;
  }
}
