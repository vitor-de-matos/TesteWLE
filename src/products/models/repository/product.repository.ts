import { BadRequestException, Injectable } from "@nestjs/common";
import { IProductRepo } from "../interface/product-repo.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "../entity/product.entity";
import { DB_PG_DATABASE } from "src/shared/database/postgres.config";
import { FindManyOptions, ILike, Repository } from "typeorm";
import { CreateProductDTO } from "../dtos/create-product.dto";
import { FindProductDTO } from "../dtos/find-product.dto";
import { UpdateProductDTO } from "../dtos/update-prodct.dto";

@Injectable()
export class ProductRepository implements IProductRepo {
  constructor(
    @InjectRepository(Product, DB_PG_DATABASE)
    private readonly repository: Repository<Product>,
  ) {}

  async create(productDTO: CreateProductDTO): Promise<Product> {
    const result = await this.repository.save(productDTO);
    return result;
  }

  async find(filters: FindProductDTO): Promise<{
    data: Product[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
  }> {
    const queryOptions: FindManyOptions<Product> = {
      where: {
        ...(filters.name && { name: ILike(`%${filters.name}%`) }),
        ...(filters.price && { price: filters.price }),
        ...(filters.stockQuantity && { stockQuantity: filters.stockQuantity }),
      },
      ...(filters.page && filters.quantity
        ? {
            take: filters.quantity,
            skip: (filters.page - 1) * filters.quantity,
          }
        : {}),
    };

    const [products, totalItems] =
      await this.repository.findAndCount(queryOptions);

    const totalPages = Math.ceil(totalItems / filters.quantity) || 1;
    const currentPage = filters.page || 1;
    return { data: products, currentPage, totalPages, totalItems };
  }

  async findById(id: number): Promise<Product> {
    const product = await this.repository.findOne({ where: { id: id } });
    if (!product) {
      throw new BadRequestException("Produto não encontrado");
    }
    return product;
  }

  async findByName(name: string): Promise<void> {
    const product = await this.repository.findOne({ where: { name: name } });
    if (product) {
      throw new BadRequestException("Produto já existe");
    }
  }

  async update(
    productId: number,
    productDTO: UpdateProductDTO,
  ): Promise<Product> {
    const product = await this.repository.findOne({ where: { id: productId } });
    if (!product) {
      throw new BadRequestException("Produto não encontrado");
    }

    const updatedProduct = await this.repository.save({
      ...product,
      ...productDTO,
    });

    return updatedProduct;
  }

  async delete(id: number): Promise<void> {
    const product = await this.repository.findOne({ where: { id: id } });
    if (!product) {
      throw new BadRequestException("Produto não encontrado");
    }

    await this.repository.delete(id);
  }
}
