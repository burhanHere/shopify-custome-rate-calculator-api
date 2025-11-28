import { Injectable, Logger } from '@nestjs/common';
import { WeightCatagoryRatesRepository } from './weight-catagory-rates.repository';
import { WeightCatagoryRate } from './entities/weight-catagory-rate.entity';
import { UpdateResult } from 'typeorm';
import { CreateWeightCatagoryRateDto } from './dto/create-weight-catagory-rate.dto';
import { UpdateWeightCatagoryRateDto } from './dto/update-weight-catagory-rate.dto';

@Injectable()
export class WeightCatagoryRatesService {
  private readonly logger: Logger;

  constructor(
    private readonly weightCatagoriesRepository: WeightCatagoryRatesRepository,
  ) {
    this.logger = new Logger(WeightCatagoryRatesService.name);
  }

  async create(
    createWeightCatagoryDto: CreateWeightCatagoryRateDto,
  ): Promise<WeightCatagoryRate> {
    this.logger.log('Creating a new weight catagory');

    const result = await this.weightCatagoriesRepository.save(
      createWeightCatagoryDto,
    );

    this.logger.log('Created a new weight catagory');

    return result;
  }

  async findAll(): Promise<WeightCatagoryRate[]> {
    this.logger.log('Fetching all weight catagories.');

    const result = (await this.weightCatagoriesRepository.findAll()) ?? [];

    this.logger.log('Fetched all weight catagories.');

    return result;
  }

  async findByProps(
    props: UpdateWeightCatagoryRateDto,
  ): Promise<WeightCatagoryRate[]> {
    this.logger.log('Finding all weight catagories by props:', props);

    const result = await this.weightCatagoriesRepository.findByProps(props);

    this.logger.log('Fetched all weight catagories.');

    return result;
  }

  async findOne(id: number): Promise<WeightCatagoryRate | object> {
    this.logger.log(`Fetching weight catagory with id: ${id}`);

    const result = (await this.weightCatagoriesRepository.findOne(id)) ?? {};

    this.logger.log(`Fetched weight catagory with id: ${id}`);

    return result;
  }

  async update(
    id: number,
    updateWeightCatagoryDto: UpdateWeightCatagoryRateDto,
  ): Promise<string> {
    this.logger.log(`Updating weight catagory with id: ${id}`);

    const result: UpdateResult = await this.weightCatagoriesRepository.update(
      id,
      updateWeightCatagoryDto,
    );

    this.logger.log(`Updated weight catagory with id: ${id}`);

    return (result.affected ?? 0) > 0
      ? 'Update successful'
      : 'No record found to update';
  }
}
