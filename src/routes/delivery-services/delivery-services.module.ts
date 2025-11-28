import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeliveryService } from './entities/delivery-service.entity';
import { DeliveryServicesController } from './delivery-services.controller';
import { DeliveryServicesService } from './delivery-services.service';
import { DeliveryServicesRepository } from './delivery-services.repository';

@Module({
  imports: [TypeOrmModule.forFeature([DeliveryService])],
  controllers: [DeliveryServicesController],
  providers: [DeliveryServicesService, DeliveryServicesRepository],
  exports: [DeliveryServicesRepository],
})
export class DeliveryServicesModule {}
