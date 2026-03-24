import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDate, IsNumber, IsOptional } from 'class-validator';
import { PaginationDTO } from 'src/shared/utils/dto/pagination.dto';

export class FindSalesDTO extends PaginationDTO {
  @ApiPropertyOptional()
  @IsOptional()
  @IsDate()
  saleDateStart?: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDate()
  saleDateEnd?: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  totalValue?: number;
}
