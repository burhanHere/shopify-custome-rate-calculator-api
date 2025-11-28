import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DeliveryServicesModule } from '../delivery-services/delivery-services.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'src/config/db/database';
import { SectorsModule } from '../sectors/sectors.module';
import { WeightCatagoryRatesModule } from '../weight-catagory-rates/weight-catagory-rates.module';
import { ZonesModule } from '../zones/zones.module';
import { CarrierServiceRateModule } from '../carrier-service-rate/carrier-service-rate.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(dataSourceOptions),

    DeliveryServicesModule,
    SectorsModule,
    WeightCatagoryRatesModule,
    ZonesModule,
    CarrierServiceRateModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
