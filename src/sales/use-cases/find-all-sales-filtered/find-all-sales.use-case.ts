import { Inject, Injectable } from "@nestjs/common";
import { FindSalesDTO } from "src/sales/models/dtos/find-sales.dto";
import { Sales } from "src/sales/models/entity/sales.entity";
import type { ISalesRepo } from "src/sales/models/interface/sales-repo.interface";

@Injectable()
export class FindAllSaleUseCase {
  constructor(
    @Inject("ISalesRepo")
    private readonly saleRepository: ISalesRepo,
  ) {}

  async find(saleDTO: FindSalesDTO): Promise<{
    data: Sales[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
  }> {
    return await this.saleRepository.find(saleDTO);
  }
}
