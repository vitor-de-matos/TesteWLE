import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Sales } from "./models/entity/sales.entity";
import { DB_PG_DATABASE } from "src/shared/database/postgres.config";
import { SharedModule } from "src/shared/shared.module";
import { SalesRepository } from "./models/repository/sales.repository";

@Module({
  imports: [TypeOrmModule.forFeature([Sales], DB_PG_DATABASE), SharedModule],
  controllers: [],
  providers: [
    SalesRepository,
    { provide: "ISalesRepo", useExisting: SalesRepository },
  ],
  exports: ["ISalesRepo"],
})
export class SalesModule {}
