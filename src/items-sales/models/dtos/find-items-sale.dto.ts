import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';
import { PaginationDTO } from 'src/shared/utils/dto/pagination.dto';

export class FindItemSalesDTO extends PaginationDTO {
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
