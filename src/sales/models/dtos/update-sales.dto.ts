import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsNumber, IsOptional } from "class-validator";

export class UpdateSalesDTO {
  @ApiPropertyOptional({
    description: "Atualiza valor total da venda",
    example: 230.0,
  })
  @IsOptional()
  @IsNumber()
  totalValue?: number;
}
