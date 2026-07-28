import { Injectable, Logger } from '@nestjs/common';
import { WeightCategoryRatesRepository } from './weight-category-rates.repository';
import { WeightCatagoryRate } from './entities/weight-catagory-rate.entity';
import { UpdateResult } from 'typeorm';
import {CreateWeightCategoryRateDto} from "./dto/create-weight-category-rate.dto";
import {UpdateWeightCategoryRateDto} from "./dto/update-weight-category-rate.dto";

@Injectable()
export class WeightCategoryRatesService {
  private readonly logger: Logger;

  constructor(
    private readonly weightCategoriesRepository: WeightCategoryRatesRepository,
  ) {
    this.logger = new Logger(WeightCategoryRatesService.name);
  }

  async create(
    createWeightCategoryDto: CreateWeightCategoryRateDto,
  ): Promise<WeightCatagoryRate> {
    this.logger.log('Creating a new weight category');

    const result = await this.weightCategoriesRepository.save(
      createWeightCategoryDto,
    );

    this.logger.log('Created a new weight category');

    return result;
  }

  async findAll(): Promise<WeightCatagoryRate[]> {
    this.logger.log('Fetching all weight categories.');

    const result = (await this.weightCategoriesRepository.findAll()) ?? [];

    this.logger.log('Fetched all weight categories.');

    return result;
  }

  async findByProps(
    props: UpdateWeightCategoryRateDto,
  ): Promise<WeightCatagoryRate[]> {
    this.logger.log('Finding all weight categories by props:', props);

    const result = await this.weightCategoriesRepository.findByProps(props);

    this.logger.log('Fetched all weight categories.');

    return result;
  }

  async findOne(id: number): Promise<WeightCatagoryRate | object> {
    this.logger.log(`Fetching weight category with id: ${id}`);

    const result = (await this.weightCategoriesRepository.findOne(id)) ?? {};

    this.logger.log(`Fetched weight category with id: ${id}`);

    return result;
  }

  async update(
    id: number,
    updateWeightCategoryDto: UpdateWeightCategoryRateDto,
  ): Promise<string> {
    this.logger.log(`Updating weight category with id: ${id}`);

    const result: UpdateResult = await this.weightCategoriesRepository.update(
      id,
      updateWeightCategoryDto,
    );

    this.logger.log(`Updated weight category with id: ${id}`);

    return (result.affected ?? 0) > 0
      ? 'Update successful'
      : 'No record found to update';
  }
}
