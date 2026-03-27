import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsNumber, IsOptional } from "class-validator";

export class PaginationDTO {
  @ApiPropertyOptional({ description: "Pagina atual" })
  @IsOptional()
  @IsNumber()
  page?: number;

  @ApiPropertyOptional({ description: "Quantidade por pagina" })
  @IsOptional()
  @IsNumber()
  quantity?: number;
}
