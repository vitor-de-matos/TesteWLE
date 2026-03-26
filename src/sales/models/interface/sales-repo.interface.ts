import { CreateSalesDTO } from "../dtos/create-sales.dto";
import { FindSalesDTO } from "../dtos/find-sales.dto";
import { UpdateSalesDTO } from "../dtos/update-sales.dto";
import { Sales } from "../entity/sales.entity";

export interface ISalesRepo {
  create(salesDTO: CreateSalesDTO): Promise<Sales>;
  find(filters: FindSalesDTO): Promise<{
    data: Sales[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
  }>;
  findById(id: number): Promise<Sales>;
  update(salesId: number, salesDTO: UpdateSalesDTO): Promise<Sales>;
  delete(id: number): Promise<void>;
}
