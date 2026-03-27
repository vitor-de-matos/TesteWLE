import { BadRequestException, Injectable } from "@nestjs/common";
import { IItemSaleRepo } from "../interface/item-sales-repo.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { ItemSales } from "../entity/items-sale.entity";
import { DB_PG_DATABASE } from "src/shared/database/postgres.config";
import { FindManyOptions, Repository } from "typeorm";
import { CreateItemSalesDTO } from "../dtos/create-items-sale.dto";
import { FindItemSalesDTO } from "../dtos/find-items-sale.dto";
import { UpdateItemSalesDTO } from "../dtos/update-items-sale.dto";
import { ItemSaleDTO } from "../dtos/item-sale.dto";

@Injectable()
export class ItemSalesRepository implements IItemSaleRepo {
  constructor(
    @InjectRepository(ItemSales, DB_PG_DATABASE)
    private readonly repository: Repository<ItemSales>,
  ) {}

  async create(itemSaleDTO: CreateItemSalesDTO): Promise<ItemSales> {
    const result = await this.repository.save({
      ...itemSaleDTO,
      product: itemSaleDTO.productId ? { id: itemSaleDTO.productId } : null,
      sales: itemSaleDTO.saleId ? { id: itemSaleDTO.saleId } : null,
    });
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
        ...(filters.saleId && { sales: { id: filters.saleId } }),
      },
      ...(filters.page && filters.quantity
        ? {
            take: filters.quantity,
            skip: (filters.page - 1) * filters.quantity,
          }
        : {}),
      relations: { product: true },
    };

    const [itemSales, totalItems] =
      await this.repository.findAndCount(queryOptions);

    const totalPages = Math.ceil(totalItems / filters.quantity) || 1;
    const currentPage = filters.page || 1;
    return { data: itemSales, currentPage, totalPages, totalItems };
  }

  async findById(id: number): Promise<ItemSales> {
    const itemSale = await this.repository.findOne({ where: { id: id } });
    if (!itemSale) {
      throw new BadRequestException("Item de venda não encontrado");
    }
    return itemSale;
  }

  async update(
    itemSaleId: number,
    itemSaleDTO: UpdateItemSalesDTO,
  ): Promise<ItemSales> {
    const itemSale = await this.repository.findOne({
      where: { id: itemSaleId },
    });
    if (!itemSale) {
      throw new BadRequestException("Item de venda não encontrado");
    }

    const updated = await this.repository.save({
      ...itemSale,
      ...itemSaleDTO,

      product: itemSaleDTO.productId
        ? { id: itemSaleDTO.productId }
        : itemSale.product,

      sale: itemSaleDTO.saleId ? { id: itemSaleDTO.saleId } : itemSale.sales,
    });

    return updated;
  }

  async delete(id: number): Promise<void> {
    const itemSale = await this.repository.findOne({ where: { id: id } });
    if (!itemSale) {
      throw new BadRequestException("Item de venda não encontrado");
    }

    await this.repository.delete(id);
  }
}
