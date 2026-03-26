import { Inject, Injectable } from "@nestjs/common";
import { Sales } from "src/sales/models/entity/sales.entity";
import type { ISalesRepo } from "src/sales/models/interface/sales-repo.interface";

@Injectable()
export class FindSaleUseCase {
  constructor(
    @Inject("ISalesRepo")
    private readonly saleRepository: ISalesRepo,
  ) {}

  async find(id: number): Promise<Sales> {
    const result = await this.saleRepository.findById(id);

    return result;
  }
}
