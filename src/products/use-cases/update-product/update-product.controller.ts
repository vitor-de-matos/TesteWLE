import {
  Controller,
  Inject,
  Get,
  Param,
  BadRequestException,
  Body,
  Patch,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiNotAcceptableResponse,
  ApiInternalServerErrorResponse,
} from "@nestjs/swagger";
import { Product } from "src/products/models/entity/product.entity";
import { UpdateProductUseCase } from "./update-product.service";
import { UpdateProductDTO } from "src/products/models/dtos/update-prodct.dto";

@ApiTags("Product")
@Controller("product")
export class UpdateProductController {
  constructor(
    @Inject(UpdateProductUseCase)
    private readonly productService: UpdateProductUseCase,
  ) {}

  @ApiOperation({ summary: "Atualiza produto por ID" })
  @ApiOkResponse({ type: Product })
  @ApiNotAcceptableResponse({ description: "Id inválido." })
  @ApiInternalServerErrorResponse({
    description: "Erro interno entre em contato com o suporte.",
  })
  @Patch(":id")
  async update(
    @Param("id") id: number,
    @Body() productDTO: UpdateProductDTO,
  ): Promise<Product> {
    if (isNaN(id)) {
      throw new BadRequestException("Id inválido");
    }
    return await this.productService.update(id, productDTO);
  }
}
