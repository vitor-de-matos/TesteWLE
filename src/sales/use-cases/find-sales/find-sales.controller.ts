import {
  BadRequestException,
  Controller,
  Get,
  Inject,
  Param,
} from "@nestjs/common";
import {
  ApiInternalServerErrorResponse,
  ApiNotAcceptableResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { FindSaleUseCase } from "./find-sales.service";
import { Sales } from "src/sales/models/entity/sales.entity";
import { SalesDTO } from "src/sales/models/dtos/sales.dto";

@ApiTags("Sale")
@Controller("sale")
export class FindSaleController {
  constructor(
    @Inject(FindSaleUseCase)
    private readonly saleService: FindSaleUseCase,
  ) {}

  @ApiOperation({ summary: "Busca venda por ID" })
  @ApiOkResponse({ type: SalesDTO })
  @ApiNotAcceptableResponse({ description: "Id inválido." })
  @ApiInternalServerErrorResponse({
    description: "Erro interno entre em contato com o suporte.",
  })
  @Get(":id")
  async find(@Param("id") id: number): Promise<Sales> {
    if (isNaN(id)) {
      throw new BadRequestException("Id inválido");
    }
    return await this.saleService.find(id);
  }
}
