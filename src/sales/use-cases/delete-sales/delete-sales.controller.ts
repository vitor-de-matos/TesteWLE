import { Controller, Delete, Inject, Param } from "@nestjs/common";
import {
  ApiInternalServerErrorResponse,
  ApiNotAcceptableResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { DeleteSaleUseCase } from "./delete-sales.service";

@ApiTags("Sale")
@Controller("sale")
export class DeleteSaleController {
  constructor(
    @Inject(DeleteSaleUseCase)
    private readonly saleService: DeleteSaleUseCase,
  ) {}

  @ApiOperation({ summary: "Excluir uma venda" })
  @ApiOkResponse({ description: "Venda removida com sucesso" })
  @ApiNotFoundResponse({ description: "Venda não encontrado." })
  @ApiNotAcceptableResponse({ description: "Id inválido." })
  @ApiInternalServerErrorResponse({
    description: "Erro interno entre em contato com o suporte.",
  })
  @Delete()
  async delete(@Param() id: number): Promise<string> {
    const result = await this.saleService.delete(id);
    return result;
  }
}
