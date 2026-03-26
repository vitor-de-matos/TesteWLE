import { Controller, Inject, Post } from "@nestjs/common";
import {
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { CreateSaleUseCase } from "./create-sales.service";
import { CreateSalesDTO } from "src/sales/models/dtos/create-sales.dto";

@ApiTags("Sale")
@Controller("sale")
export class CreateSaleController {
  constructor(
    @Inject(CreateSaleUseCase)
    private readonly createSaleService: CreateSaleUseCase,
  ) {}

  @ApiOperation({
    summary: "Cria uma venda que sera calculada automaticamente",
  })
  @ApiBody({ type: CreateSalesDTO })
  @ApiInternalServerErrorResponse({
    description: "Erro interno entre em contato com o suporte.",
  })
  @Post()
  async create(): Promise<number> {
    return await this.createSaleService.create();
  }
}
