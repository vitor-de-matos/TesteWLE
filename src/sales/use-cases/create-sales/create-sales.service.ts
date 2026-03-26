import { Inject, Injectable } from "@nestjs/common";
import { CreateSalesDTO } from "src/sales/models/dtos/create-sales.dto";
import type { ISalesRepo } from "src/sales/models/interface/sales-repo.interface";

@Injectable()
export class CreateSaleUseCase {
  constructor(
    @Inject("ISalesRepo")
    private readonly salesRepository: ISalesRepo,
  ) {}

  async create(salesDTO?: CreateSalesDTO): Promise<number> {
    salesDTO.totalValue = 0;
    const saleCreated = await this.salesRepository.create(salesDTO);
    return saleCreated.id;
  }
}
