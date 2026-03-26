import { Body, Controller, Inject, Post } from "@nestjs/common";
import {
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { CreateItemSaleUseCase } from "./create-item-sale.service";
import { ItemSales } from "src/items-sales/models/entity/items-sale.entity";
import { CreateItemSalesDTO } from "src/items-sales/models/dtos/create-items-sale.dto";

@ApiTags("Item Sale")
@Controller("item_sale")
export class CreateItemSaleController {
  constructor(
    @Inject(CreateItemSaleUseCase)
    private readonly createItemSaleService: CreateItemSaleUseCase,
  ) {}

  @ApiOperation({ summary: "Adicionar item a venda" })
  @ApiBody({ type: CreateItemSalesDTO })
  @ApiCreatedResponse({ type: Number })
  @ApiInternalServerErrorResponse({
    description: "Erro interno entre em contato com o suporte.",
  })
  @Post()
  async create(@Body() itemSaleDTO: CreateItemSalesDTO): Promise<ItemSales> {
    return await this.createItemSaleService.create(itemSaleDTO);
  }
}
