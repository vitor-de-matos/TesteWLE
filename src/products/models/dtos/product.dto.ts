import { ApiProperty } from "@nestjs/swagger";

export class ProductDTO {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  price: number;

  @ApiProperty({ example: 1 })
  stockQuantity: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
