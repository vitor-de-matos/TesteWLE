import { Inject, Injectable } from "@nestjs/common";
import { ItemSales } from "src/items-sales/models/entity/items-sale.entity";
import type { IItemSaleRepo } from "src/items-sales/models/interface/item-sales-repo.interface";

@Injectable()
export class FindItemSaleUseCase {
  constructor(
    @Inject("IItemSaleRepo")
    private readonly itemSaleRepository: IItemSaleRepo,
  ) {}

  async find(itemSaleId: number): Promise<ItemSales> {
    return await this.itemSaleRepository.findById(itemSaleId);
  }
}
