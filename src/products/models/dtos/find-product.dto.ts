import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString, Max, Min } from "class-validator";
import { PaginationDTO } from "src/shared/utils/dto/pagination.dto";

export class FindProductDTO extends PaginationDTO {
  @ApiPropertyOptional({ description: "Nome do produto" })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ description: "Valor do produto" })
  @IsOptional()
  @IsNumber()
  @Min(0)
  price?: number;

  @ApiPropertyOptional({ description: "Quantidade em estoque" })
  @IsOptional()
  @IsNumber()
  @Min(0)
  stockQuantity?: number;
}
