import { BadRequestException, Injectable } from "@nestjs/common";
import { ISalesRepo } from "../interface/sales-repo.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { Sales } from "../entity/sales.entity";
import { DB_PG_DATABASE } from "src/shared/database/postgres.config";
import {
  Between,
  FindManyOptions,
  LessThanOrEqual,
  MoreThanOrEqual,
  Repository,
} from "typeorm";
import { CreateSalesDTO } from "../dtos/create-sales.dto";
import { FindSalesDTO } from "../dtos/find-sales.dto";
import { UpdateSalesDTO } from "../dtos/update-sales.dto";

@Injectable()
export class SalesRepository implements ISalesRepo {
  constructor(
    @InjectRepository(Sales, DB_PG_DATABASE)
    private readonly repository: Repository<Sales>,
  ) {}

  async create(salesDTO: CreateSalesDTO): Promise<Sales> {
    const result = await this.repository.save(salesDTO);
    return result;
  }

  async find(filters: FindSalesDTO): Promise<{
    data: Sales[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
  }> {
    const queryOptions: FindManyOptions<Sales> = {
      where: {
        ...(filters.totalValue && { totalValue: filters.totalValue }),
        ...(filters.saleDateStart &&
          filters.saleDateEnd && {
            saleDate: Between(filters.saleDateStart, filters.saleDateEnd),
          }),

        ...(filters.saleDateStart &&
          !filters.saleDateEnd && {
            saleDate: MoreThanOrEqual(filters.saleDateStart),
          }),

        ...(!filters.saleDateStart &&
          filters.saleDateEnd && {
            saleDate: LessThanOrEqual(filters.saleDateEnd),
          }),
      },
      ...(filters.page && filters.quantity
        ? {
            take: filters.quantity,
            skip: (filters.page - 1) * filters.quantity,
          }
        : {}),
      relations: { itemSales: { product: true } },
    };

    const [sales, totalItems] =
      await this.repository.findAndCount(queryOptions);

    const totalPages = Math.ceil(totalItems / filters.quantity) || 1;
    const currentPage = filters.page || 1;
    return { data: sales, currentPage, totalPages, totalItems };
  }

  async findById(id: number): Promise<Sales> {
    const sales = await this.repository.findOne({
      where: { id: id },
      relations: { itemSales: { product: true } },
    });
    if (!sales) {
      throw new BadRequestException("Venda não encontrada");
    }
    return sales;
  }

  async update(salesId: number, salesDTO: UpdateSalesDTO): Promise<Sales> {
    const sales = await this.repository.findOne({ where: { id: salesId } });
    if (!sales) {
      throw new BadRequestException("Venda não encontrada");
    }

    const updatedSales = await this.repository.save({
      ...sales,
      ...salesDTO,
    });

    return updatedSales;
  }

  async delete(id: number): Promise<void> {
    const sales = await this.repository.findOne({ where: { id: id } });
    if (!sales) {
      throw new BadRequestException("Venda não encontrada");
    }

    await this.repository.delete(id);
  }
}
