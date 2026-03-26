import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { UpdateItemSalesDTO } from "src/items-sales/models/dtos/update-items-sale.dto";
import { ItemSales } from "src/items-sales/models/entity/items-sale.entity";
import type { IItemSaleRepo } from "src/items-sales/models/interface/item-sales-repo.interface";
import { Product } from "src/products/models/entity/product.entity";
import type { IProductRepo } from "src/products/models/interface/product-repo.interface";
import { Sales } from "src/sales/models/entity/sales.entity";
import type { ISalesRepo } from "src/sales/models/interface/sales-repo.interface";

@Injectable()
export class UpdateItemSaleUseCase {
  constructor(
    @Inject("IItemSaleRepo")
    private readonly itemSaleRepository: IItemSaleRepo,
    @Inject("IProductRepo")
    private readonly productRepository: IProductRepo,
    @Inject("ISalesRepo")
    private readonly saleRepository: ISalesRepo,
  ) {}

  async update(
    id: number,
    itemSaleDTO: UpdateItemSalesDTO,
  ): Promise<ItemSales> {
    const itemSale = await this.itemSaleRepository.findById(id);

    let product: Product;
    let sale: Sales;

    if (itemSaleDTO.productId) {
      product = await this.productRepository.findById(itemSaleDTO.productId);
    } else {
      product = await this.productRepository.findById(itemSale.id);
    }

    itemSaleDTO.unityValue = product.price;

    if (itemSaleDTO.itemQuantity) {
      itemSaleDTO.totalValue =
        itemSaleDTO.itemQuantity * itemSaleDTO.unityValue;
    } else {
      itemSaleDTO.totalValue = itemSale.itemQuantity * itemSaleDTO.unityValue;
    }
    if (itemSaleDTO.saleId) {
      sale = await this.saleRepository.findById(itemSaleDTO.saleId);
    } else {
      await this.saleRepository.findById(itemSale.id);
    }

    if (
      itemSaleDTO.itemQuantity >
      itemSale.itemQuantity + product.stockQuantity
    ) {
      throw new BadRequestException(
        "Quantidade de produto insuficiente no estoque",
      );
    }

    await this.saleRepository.update(sale.id, {
      totalValue: sale.totalValue - itemSale.totalValue,
    });

    const result = await this.itemSaleRepository.update(id, itemSaleDTO);

    await this.saleRepository.update(sale.id, {
      totalValue: sale.totalValue + result.totalValue,
    });

    return result;
  }
}
