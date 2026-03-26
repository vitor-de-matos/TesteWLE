import { Inject, Injectable } from "@nestjs/common";
import type { IItemSaleRepo } from "src/items-sales/models/interface/item-sales-repo.interface";
import type { ISalesRepo } from "src/sales/models/interface/sales-repo.interface";

@Injectable()
export class DeleteSaleUseCase {
  constructor(
    @Inject("ISalesRepo")
    private readonly saleRepository: ISalesRepo,
    @Inject("IItemSaleRepo")
    private readonly itemSaleRepository: IItemSaleRepo,
  ) {}

  async delete(id: number): Promise<string> {
    const sale = await this.saleRepository.findById(id);

    if (sale?.itemSales?.length > 0) {
      for (const item of sale.itemSales) {
        await this.itemSaleRepository.delete(item.id);
      }
    }

    await this.saleRepository.delete(id);

    return "Venda removida com sucesso";
  }
}
