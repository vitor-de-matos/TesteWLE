import { Inject, Injectable } from '@nestjs/common';
import { CreateItemSalesDTO } from 'src/items-sales/models/dtos/create-items-sale.dto';
import { ItemSales } from 'src/items-sales/models/entity/items-sale.entity';
import type { IItemSaleRepo } from 'src/items-sales/models/interface/item-sales-repo.interface';

@Injectable()
export class CreateItemSaleUseCase {
  constructor(
    @Inject('IItemSaleRepo')
    private readonly itemSalesRepository: IItemSaleRepo,
  ) {}

  async create(itemSaleDTO: CreateItemSalesDTO): Promise<ItemSales> {
    const itemSaleCreated = await this.itemSalesRepository.create(itemSaleDTO);
    return itemSaleCreated;
  }
}
