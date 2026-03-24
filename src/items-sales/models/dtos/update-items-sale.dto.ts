import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class UpdateItemSalesDTO {
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  itemQuantity: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  unityValue: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  totalValue: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  productId: number;
}
