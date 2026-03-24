import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateSalesDTO {
  @ApiProperty({ description: 'Valor total da venda' })
  @IsNotEmpty()
  @IsNumber()
  totalValue: number;
}
