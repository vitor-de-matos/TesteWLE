import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateItemSalesDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  itemQuantity: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  unityValue: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  totalValue: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  productId: number;
}
