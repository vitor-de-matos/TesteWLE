import { CreateProductDTO } from '../dtos/create-product.dto';
import { FindProductDTO } from '../dtos/find-product.dto';
import { UpdateProductDTO } from '../dtos/update-prodct.dto';
import { Product } from '../entity/product.entity';

export interface IProductRepo {
  create(productDTO: CreateProductDTO): Promise<Product>;
  find(filters: FindProductDTO): Promise<{
    data: Product[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
  }>;
  findById(id: number): Promise<Product>;
  update(productId: number, productDTO: UpdateProductDTO): Promise<Product>;
  delete(id: number): Promise<void>;
}
