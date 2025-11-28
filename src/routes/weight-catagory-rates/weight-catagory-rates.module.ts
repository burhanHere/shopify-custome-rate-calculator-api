import { Module } from '@nestjs/common';
import { WeightCatagoryRatesController } from './weight-catagory-rates.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WeightCatagoryRate } from './entities/weight-catagory-rate.entity';
import { WeightCatagoryRatesRepository } from './weight-catagory-rates.repository';
import { WeightCatagoryRatesService } from './weight-catagory-rates.service';

@Module({
  imports: [TypeOrmModule.forFeature([WeightCatagoryRate])],
  controllers: [WeightCatagoryRatesController],
  providers: [WeightCatagoryRatesService, WeightCatagoryRatesRepository],
  exports: [WeightCatagoryRatesRepository],
})
export class WeightCatagoryRatesModule {}
