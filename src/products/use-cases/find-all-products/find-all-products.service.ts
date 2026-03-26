import { Injectable, Inject } from "@nestjs/common";
import { FindProductDTO } from "src/products/models/dtos/find-product.dto";
import { Product } from "src/products/models/entity/product.entity";
import type { IProductRepo } from "src/products/models/interface/product-repo.interface";

@Injectable()
export class FindAllProductUseCase {
  constructor(
    @Inject("IProductRepo")
    private readonly productRepository: IProductRepo,
  ) {}

  async find(productDTO: FindProductDTO): Promise<{
    data: Product[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
  }> {
    return await this.productRepository.find(productDTO);
  }
}
