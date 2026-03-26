import { Body, Controller, Get, Inject } from "@nestjs/common";
import {
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { FindAllItemSaleUseCase } from "./find-all-item-sale.service";
import { FindItemSalesDTO } from "src/items-sales/models/dtos/find-items-sale.dto";
import { ItemSales } from "src/items-sales/models/entity/items-sale.entity";

@ApiTags("Item Sale")
@Controller("item_sale")
export class FindAllItemSaleController {
  constructor(
    @Inject(FindAllItemSaleUseCase)
    private readonly itemSaleService: FindAllItemSaleUseCase,
  ) {}

  @ApiOperation({ summary: "Buscar todos os itens da venda" })
  @ApiInternalServerErrorResponse({
    description: "Erro interno entre em contato com o suporte.",
  })
  @Get("all")
  async find(@Body() itemSaleDTO: FindItemSalesDTO): Promise<{
    data: ItemSales[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
  }> {
    const result = await this.itemSaleService.find(itemSaleDTO);
    return result;
  }
}
