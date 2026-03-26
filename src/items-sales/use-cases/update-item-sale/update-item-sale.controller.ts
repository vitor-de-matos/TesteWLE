import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Patch,
} from "@nestjs/common";
import {
  ApiInternalServerErrorResponse,
  ApiNotAcceptableResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { UpdateItemSaleUseCase } from "./update-item-sale.service";
import { ItemSales } from "src/items-sales/models/entity/items-sale.entity";
import { UpdateItemSalesDTO } from "src/items-sales/models/dtos/update-items-sale.dto";

@ApiTags("Item Sale")
@Controller("item_sale")
export class UpdateItemSaleController {
  constructor(
    @Inject(UpdateItemSaleUseCase)
    private readonly itemSaleService: UpdateItemSaleUseCase,
  ) {}

  @ApiOperation({ summary: "Atualiza item da venda por ID" })
  @ApiOkResponse({ type: ItemSales })
  @ApiNotAcceptableResponse({ description: "Id inválido." })
  @ApiInternalServerErrorResponse({
    description: "Erro interno entre em contato com o suporte.",
  })
  @Patch(":id")
  async update(
    @Param("id") id: number,
    @Body() itemSaleDTO: UpdateItemSalesDTO,
  ): Promise<ItemSales> {
    if (isNaN(id)) {
      throw new BadRequestException("Id inválido");
    }
    return await this.itemSaleService.update(id, itemSaleDTO);
  }
}
