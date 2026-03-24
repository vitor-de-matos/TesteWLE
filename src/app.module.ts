import { Module } from '@nestjs/common';
import { SharedModule } from './shared/shared.module';
import { ProductsModule } from './products/products.module';
import { SalesModule } from './sales/sales.module';
import { ItemsSalesModule } from './items-sales/items-sales.module';
import { ConfigModule } from '@nestjs/config';
import { config } from './shared/config/config';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
      envFilePath: ['.env'],
    }),
    SharedModule,
    ProductsModule,
    SalesModule,
    ItemsSalesModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
