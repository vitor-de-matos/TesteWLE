import { Inject, Injectable } from "@nestjs/common";
import type { IItemSaleRepo } from "src/items-sales/models/interface/item-sales-repo.interface";

@Injectable()
export class DeleteItemSaleUseCase {
  constructor(
    @Inject("IItemSaleRepo")
    private readonly itemSaleRepository: IItemSaleRepo,
  ) {}

  async delete(id: number): Promise<void> {
    const itemSale = await this.itemSaleRepository.findById(id);
    await this.itemSaleRepository.delete(id);
  }
}
