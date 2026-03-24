import { CreateItemSalesDTO } from '../dtos/create-items-sale.dto';
import { FindItemSalesDTO } from '../dtos/find-items-sale.dto';
import { UpdateItemSalesDTO } from '../dtos/update-items-sale.dto';
import { ItemSales } from '../entity/items-sale.entity';

export interface IItemSaleRepo {
  create(itemSalesDTO: CreateItemSalesDTO): Promise<ItemSales>;
  find(filters: FindItemSalesDTO): Promise<{
    data: ItemSales[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
  }>;
  findById(id: number): Promise<ItemSales>;
  update(
    itemSalesId: number,
    itemSalesDTO: UpdateItemSalesDTO,
  ): Promise<ItemSales>;
  delete(id: number): Promise<void>;
}
