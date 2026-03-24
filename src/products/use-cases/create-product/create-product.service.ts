import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateProductDTO } from 'src/products/models/dtos/create-product.dto';
import { Product } from 'src/products/models/entity/product.entity';
import type { IProductRepo } from 'src/products/models/interface/product-repo.interface';

@Injectable()
export class CreateProductUseCase {
  constructor(
    @Inject('IProductRepo')
    private readonly productRepository: IProductRepo,
  ) {}

  async create(productDTO: CreateProductDTO): Promise<Product> {
    const produtCreated = await this.productRepository.create(productDTO);
    return produtCreated;
  }
}
