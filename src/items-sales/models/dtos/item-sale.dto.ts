import { ApiProperty } from "@nestjs/swagger";

export class itemSaleDTO {
  @ApiProperty()
  id: number;

  @ApiProperty()
  itemQuantity: number;

  @ApiProperty()
  unityValue: number;

  @ApiProperty()
  totalValue: number;

  @ApiProperty({ example: 1 })
  productId: number;

  @ApiProperty({ example: 10 })
  saleId: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
