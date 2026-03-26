import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsNumber, IsOptional } from "class-validator";

export class UpdateItemSalesDTO {
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  itemQuantity?: number;

  @ApiPropertyOptional({ readOnly: true })
  @IsOptional()
  @IsNumber()
  unityValue?: number;

  @ApiPropertyOptional({ readOnly: true })
  @IsOptional()
  @IsNumber()
  totalValue?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  productId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  saleId?: number;
}
