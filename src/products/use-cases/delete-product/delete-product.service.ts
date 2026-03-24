import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import type { IProductRepo } from 'src/products/models/interface/product-repo.interface';

@Injectable()
export class DeleteProductUseCase {
  constructor(
    @Inject('IProductRepo')
    private readonly productRepository: IProductRepo,
  ) {}

  async delete(id: number): Promise<string> {
    await this.productRepository.findById(id);

    await this.productRepository.delete(id);

    return 'produto deletado com sucesso';
  }
}
