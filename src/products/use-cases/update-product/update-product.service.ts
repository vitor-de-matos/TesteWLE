import { Injectable, Inject, BadRequestException } from "@nestjs/common";
import { UpdateProductDTO } from "src/products/models/dtos/update-prodct.dto";
import { Product } from "src/products/models/entity/product.entity";
import type { IProductRepo } from "src/products/models/interface/product-repo.interface";

@Injectable()
export class UpdateProductUseCase {
  constructor(
    @Inject("IProductRepo")
    private readonly productRepository: IProductRepo,
  ) {}

  async update(id: number, productDTO: UpdateProductDTO): Promise<Product> {
    if (productDTO.name) {
      await this.productRepository.findByName(productDTO.name);
    }

    if (productDTO.stockQuantity < 0) {
      throw new BadRequestException("Estoque não pode estar negativo");
    }

    if (productDTO.price < 0) {
      throw new BadRequestException("Preço não pode estar negativo");
    }
    const result = await this.productRepository.update(id, productDTO);

    return result;
  }
}
