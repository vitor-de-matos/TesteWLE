import { Inject, Injectable } from "@nestjs/common";
import { FindItemSalesDTO } from "src/items-sales/models/dtos/find-items-sale.dto";
import { ItemSales } from "src/items-sales/models/entity/items-sale.entity";
import type { IItemSaleRepo } from "src/items-sales/models/interface/item-sales-repo.interface";

@Injectable()
export class FindAllItemSaleUseCase {
  constructor(
    @Inject("IItemSaleRepo")
    private readonly itemSalesRepository: IItemSaleRepo,
  ) {}

  async find(itemSalesDTO: FindItemSalesDTO): Promise<{
    data: ItemSales[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
  }> {
    return await this.itemSalesRepository.find(itemSalesDTO);
  }
}
