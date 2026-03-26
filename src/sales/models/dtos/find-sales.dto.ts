import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsDate, IsNumber, IsOptional } from "class-validator";
import { PaginationDTO } from "src/shared/utils/dto/pagination.dto";

export class FindSalesDTO extends PaginationDTO {
  @ApiPropertyOptional({
    description: "Filtra vendas pelo valor total exato",
    example: 100.5,
  })
  @IsOptional()
  @IsNumber()
  totalValue?: number;

  @ApiPropertyOptional({
    description:
      "Data inicial da venda (retorna registros com data maior ou igual a este valor)",
    example: "2026-03-01T00:00:00.000Z",
  })
  @IsOptional()
  @IsDate()
  saleDateStart?: Date;

  @ApiPropertyOptional({
    description:
      "Data final da venda (retorna registros com data menor ou igual a este valor)",
    example: "2026-03-31T23:59:59.999Z",
  })
  @IsOptional()
  @IsDate()
  saleDateEnd?: Date;
}
