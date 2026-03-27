import { ApiProperty } from "@nestjs/swagger";
import { ProductDTO } from "src/products/models/dtos/product.dto";

export class ItemSaleDTO {
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

  @ApiProperty({ type: () => ProductDTO })
  product: ProductDTO;
}
