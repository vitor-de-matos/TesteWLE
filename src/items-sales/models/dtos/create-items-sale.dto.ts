import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class CreateItemSalesDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  itemQuantity: number;

  @ApiPropertyOptional({ readOnly: true })
  @IsOptional()
  @IsNumber()
  unityValue?: number;

  @ApiPropertyOptional({ readOnly: true })
  @IsOptional()
  @IsNumber()
  totalValue?: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  productId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  saleId: number;
}
