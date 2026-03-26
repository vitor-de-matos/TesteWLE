import { Inject, Injectable } from "@nestjs/common";
import type { IItemSaleRepo } from "src/items-sales/models/interface/item-sales-repo.interface";
import type { IProductRepo } from "src/products/models/interface/product-repo.interface";
import type { ISalesRepo } from "src/sales/models/interface/sales-repo.interface";

@Injectable()
export class DeleteItemSaleUseCase {
  constructor(
    @Inject("IItemSaleRepo")
    private readonly itemSaleRepository: IItemSaleRepo,
    @Inject("IProductRepo")
    private readonly productRepository: IProductRepo,
    @Inject("ISalesRepo")
    private readonly salesRepository: ISalesRepo,
  ) {}

  async delete(id: number): Promise<string> {
    const itemSale = await this.itemSaleRepository.findById(id);

    const product = await this.productRepository.findById(itemSale.product.id);

    const sale = await this.salesRepository.findById(itemSale.sales.id);

    await this.productRepository.update(product.id, {
      stockQuantity: product.stockQuantity + itemSale.itemQuantity,
    });

    await this.salesRepository.update(sale.id, {
      totalValue: sale.totalValue - itemSale.totalValue,
    });

    await this.itemSaleRepository.delete(id);

    return "Item removido com sucesso";
  }
}
