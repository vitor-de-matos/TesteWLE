import { Controller, Delete, Inject, Param } from "@nestjs/common";
import {
  ApiInternalServerErrorResponse,
  ApiNotAcceptableResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { DeleteItemSaleUseCase } from "./delete-item-sale.service";

@ApiTags("Item Sale")
@Controller("item_sale")
export class DeleteItemSaleController {
  constructor(
    @Inject(DeleteItemSaleUseCase)
    private readonly itemSaleService: DeleteItemSaleUseCase,
  ) {}

  @ApiOperation({ summary: "Excluir um item da venda" })
  @ApiOkResponse({ description: "Item removido com sucesso" })
  @ApiNotFoundResponse({ description: "Item não encontrado." })
  @ApiNotAcceptableResponse({ description: "Id inválido." })
  @ApiInternalServerErrorResponse({
    description: "Erro interno entre em contato com o suporte.",
  })
  @Delete()
  async delete(@Param() id: number): Promise<string> {
    const result = await this.itemSaleService.delete(id);
    return result;
  }
}
