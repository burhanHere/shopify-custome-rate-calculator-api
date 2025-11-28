import { Module } from '@nestjs/common';
import { CarrierServiceRateService } from './carrier-service-rate.service';
import { CarrierServiceRateController } from './carrier-service-rate.controller';
import { ZonesModule } from '../zones/zones.module';
import { WeightCatagoryRatesModule } from '../weight-catagory-rates/weight-catagory-rates.module';
import { DeliveryServicesModule } from '../delivery-services/delivery-services.module';
import { SectorsModule } from '../sectors/sectors.module';

@Module({
  imports: [
    ZonesModule,
    WeightCatagoryRatesModule,
    DeliveryServicesModule,
    SectorsModule,
  ],
  controllers: [CarrierServiceRateController],
  providers: [CarrierServiceRateService],
})
export class CarrierServiceRateModule {}
