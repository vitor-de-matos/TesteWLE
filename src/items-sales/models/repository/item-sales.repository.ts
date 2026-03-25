import { BadRequestException, Injectable } from "@nestjs/common";
import { IItemSaleRepo } from "../interface/item-sales-repo.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { ItemSales } from "../entity/items-sale.entity";
import { DB_PG_DATABASE } from "src/shared/database/postgres.config";
import { FindManyOptions, Repository } from "typeorm";
import { CreateItemSalesDTO } from "../dtos/create-items-sale.dto";
import { FindItemSalesDTO } from "../dtos/find-items-sale.dto";
import { UpdateItemSalesDTO } from "../dtos/update-items-sale.dto";

@Injectable()
export class ItemSalesRepository implements IItemSaleRepo {
  constructor(
    @InjectRepository(ItemSales, DB_PG_DATABASE)
    private readonly repository: Repository<ItemSales>,
  ) {}

  async create(productDTO: CreateItemSalesDTO): Promise<ItemSales> {
    const result = await this.repository.save(productDTO);
    return result;
  }

  async find(filters: FindItemSalesDTO): Promise<{
    data: ItemSales[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
  }> {
    const queryOptions: FindManyOptions<ItemSales> = {
      where: {
        ...(filters.itemQuantity && { itemQuantity: filters.itemQuantity }),
        ...(filters.unityValue && { description: filters.unityValue }),
        ...(filters.totalValue && { totalValue: filters.totalValue }),
        ...(filters.productId && { product: { id: filters.productId } }),
      },
      ...(filters.page && filters.quantity
        ? {
            take: filters.quantity,
            skip: (filters.page - 1) * filters.quantity,
          }
        : {}),
      relations: { product: true },
    };

    const [products, totalItems] =
      await this.repository.findAndCount(queryOptions);

    const totalPages = Math.ceil(totalItems / filters.quantity);
    const currentPage = filters.page || 1;
    return { data: products, currentPage, totalPages, totalItems };
  }

  async findById(id: number): Promise<ItemSales> {
    const itemSale = await this.repository.findOne({ where: { id: id } });
    if (!itemSale) {
      throw new BadRequestException("Item de venda não encontrado");
    }
    return itemSale;
  }

  async update(
    productId: number,
    productDTO: UpdateItemSalesDTO,
  ): Promise<ItemSales> {
    const product = await this.repository.findOne({ where: { id: productId } });
    if (!product) {
      throw new BadRequestException("Item de venda não encontrado");
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
      throw new BadRequestException("Item de venda não encontrado");
    }

    await this.repository.delete(id);
  }
}
