import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { CreateItemSalesDTO } from "src/items-sales/models/dtos/create-items-sale.dto";
import { ItemSales } from "src/items-sales/models/entity/items-sale.entity";
import type { IItemSaleRepo } from "src/items-sales/models/interface/item-sales-repo.interface";
import type { IProductRepo } from "src/products/models/interface/product-repo.interface";
import type { ISalesRepo } from "src/sales/models/interface/sales-repo.interface";

@Injectable()
export class CreateItemSaleUseCase {
  constructor(
    @Inject("IItemSaleRepo")
    private readonly itemSalesRepository: IItemSaleRepo,
    @Inject("ISalesRepo")
    private readonly saleRepository: ISalesRepo,
    @Inject("IProductRepo")
    private readonly productRepository: IProductRepo,
  ) {}

  async create(itemSaleDTO: CreateItemSalesDTO): Promise<ItemSales> {
    const product = await this.productRepository.findById(
      itemSaleDTO.productId,
    );
    if (product.stockQuantity < itemSaleDTO.itemQuantity) {
      throw new BadRequestException(
        "Quantidade de produto insuficiente no estoque",
      );
    }
    itemSaleDTO.unityValue = product.price;
    itemSaleDTO.totalValue = itemSaleDTO.itemQuantity * itemSaleDTO.unityValue;

    const itemSale = await this.itemSalesRepository.create(itemSaleDTO);

    const sale = await this.saleRepository.findById(itemSaleDTO.saleId);

    await this.saleRepository.update(sale.id, {
      totalValue: itemSale.totalValue + sale.totalValue,
    });

    await this.productRepository.update(product.id, {
      stockQuantity: product.stockQuantity - itemSaleDTO.itemQuantity,
    });

    return itemSale;
  }
}
