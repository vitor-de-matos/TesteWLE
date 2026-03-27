import { ApiProperty } from "@nestjs/swagger";
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
} from "class-validator";

export class CreateProductDTO {
  @ApiProperty({ description: "Nome do produto" })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: "Descrição do produto com no maximo 50 caracteres",
  })
  @IsString()
  @Max(50)
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: "Preço do produto, este valor não pode ser negativo",
  })
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  price: number;

  @ApiProperty({
    description: "Quantidade em estoque, este valor não pode ser negativo",
  })
  @IsNotEmpty()
  @Min(0)
  @IsInt()
  stockQuantity: number;
}
