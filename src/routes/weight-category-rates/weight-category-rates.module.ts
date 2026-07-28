import { Module } from '@nestjs/common';
import { WeightCategoryRatesController } from './weight-category-rates.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WeightCatagoryRate } from './entities/weight-catagory-rate.entity';
import { WeightCategoryRatesRepository } from './weight-category-rates.repository';
import { WeightCategoryRatesService } from './weight-category-rates.service';

@Module({
  imports: [TypeOrmModule.forFeature([WeightCatagoryRate])],
  controllers: [WeightCategoryRatesController],
  providers: [WeightCategoryRatesService, WeightCategoryRatesRepository],
  exports: [WeightCategoryRatesRepository],
})
export class WeightCatagoryRatesModule {}
