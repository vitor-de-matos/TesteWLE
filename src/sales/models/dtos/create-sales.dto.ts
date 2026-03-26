import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsNumber, IsOptional } from "class-validator";

export class CreateSalesDTO {
  @ApiPropertyOptional({ description: "Valor total da venda", readOnly: true })
  @IsOptional()
  @IsNumber()
  totalValue?: number;
}
