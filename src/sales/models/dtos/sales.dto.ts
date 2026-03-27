import { ApiProperty } from "@nestjs/swagger";
import { ItemSaleDTO } from "src/items-sales/models/dtos/item-sale.dto";

export class SalesDTO {
  @ApiProperty({ example: 10 })
  id: number;

  @ApiProperty()
  saleDate: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  totalValue: number;

  @ApiProperty({ type: () => ItemSaleDTO, isArray: true })
  itemSales: ItemSaleDTO[];
}
