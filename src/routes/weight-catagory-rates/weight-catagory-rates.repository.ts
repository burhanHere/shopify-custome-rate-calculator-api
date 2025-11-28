import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { WeightCatagoryRate } from './entities/weight-catagory-rate.entity';
import { UpdateWeightCatagoryRateDto } from './dto/update-weight-catagory-rate.dto';

@Injectable()
export class WeightCatagoryRatesRepository {
  constructor(
    @InjectRepository(WeightCatagoryRate)
    private readonly repository: Repository<WeightCatagoryRate>,
  ) {}

  create(newSector: Partial<WeightCatagoryRate>): WeightCatagoryRate {
    return this.repository.create(newSector);
  }

  async save(
    newSector: Partial<WeightCatagoryRate>,
  ): Promise<WeightCatagoryRate> {
    return await this.repository.save(newSector);
  }

  async update(
    id: number,
    updatedSector: Partial<WeightCatagoryRate>,
  ): Promise<UpdateResult> {
    return await this.repository.update(id, updatedSector);
  }

  async findAll(): Promise<WeightCatagoryRate[]> {
    return await this.repository.find();
  }

  async findByProps(
    props: UpdateWeightCatagoryRateDto,
  ): Promise<WeightCatagoryRate[]> {
    return await this.repository.find({
      where: {
        weightLowerLimit: props.weightLowerLimit,
        weightUpperLimit: props.weightUpperLimit,
        rate: props.rate,
        sectorId: props.sectorId,
      },
    });
  }

  async findOne(id: number): Promise<WeightCatagoryRate | null> {
    return await this.repository.findOne({ where: { id: id } });
  }
}
