import { Body, Controller, Get, Inject, Query } from "@nestjs/common";
import {
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { FindAllSaleUseCase } from "./find-all-sales.use-case";
import { FindSalesDTO } from "src/sales/models/dtos/find-sales.dto";
import { Sales } from "src/sales/models/entity/sales.entity";

@ApiTags("Sale")
@Controller("sale")
export class FindAllSaleController {
  constructor(
    @Inject(FindAllSaleUseCase)
    private readonly saleService: FindAllSaleUseCase,
  ) {}

  @ApiOperation({ summary: "Buscar todas as vendas, filtradas e paginadas" })
  @ApiInternalServerErrorResponse({
    description: "Erro interno entre em contato com o suporte.",
  })
  @Get()
  async find(@Query() saleDTO: FindSalesDTO): Promise<{
    data: Sales[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
  }> {
    const result = await this.saleService.find(saleDTO);
    return result;
  }
}
