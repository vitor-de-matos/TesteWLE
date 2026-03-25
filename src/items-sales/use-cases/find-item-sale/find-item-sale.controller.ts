import { Controller, Get, Inject, Param } from "@nestjs/common";
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { FindItemSaleUseCase } from "./find-item-sale.use-case";
import { ItemSales } from "src/items-sales/models/entity/items-sale.entity";

@ApiTags("Item Sale")
@Controller("item_sale")
export class FindItemSaleController {
  constructor(
    @Inject(FindItemSaleUseCase)
    private readonly itemSaleService: FindItemSaleUseCase,
  ) {}

  @ApiOperation({})
  @ApiOkResponse({})
  @ApiNotFoundResponse({})
  @ApiInternalServerErrorResponse({
    description: "Erro interno entre em contato com o suporte.",
  })
  @Get()
  async find(@Param("id") id: number): Promise<ItemSales> {
    return await this.itemSaleService.find(id);
  }
}
