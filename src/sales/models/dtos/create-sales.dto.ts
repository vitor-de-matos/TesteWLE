import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateSalesDTO {
  @ApiProperty({ description: "Valor total da venda", example: 100.5 })
  @IsNotEmpty()
  @IsNumber()
  totalValue: number;
}
