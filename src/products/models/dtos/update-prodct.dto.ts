import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString, Max, Min } from "class-validator";

export class UpdateProductDTO {
  @ApiPropertyOptional({ description: "Nome do produto" })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    description: "Descrição do produto com no maximo 50 caracteres",
  })
  @IsOptional()
  @IsString()
  @Max(50)
  desription?: string;

  @ApiPropertyOptional({
    description: "Preço do produto, este valor não pode ser negativo",
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  price?: number;

  @ApiPropertyOptional({
    description: "Quantidade em estoque, este valor não pode ser negativo",
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  stockQuantity?: number;
}
