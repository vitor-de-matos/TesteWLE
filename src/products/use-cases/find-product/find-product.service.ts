import { Injectable, Inject } from '@nestjs/common';
import { Product } from 'src/products/models/entity/product.entity';
import type { IProductRepo } from 'src/products/models/interface/product-repo.interface';

@Injectable()
export class FindProductUseCase {
  constructor(
    @Inject('IProductRepo')
    private readonly productRepository: IProductRepo,
  ) {}

  async find(id: number): Promise<Product> {
    const result = await this.productRepository.findById(id);

    return result;
  }
}
