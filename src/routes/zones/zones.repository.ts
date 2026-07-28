import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Zone } from './entities/zone.entity';
import { UpdateZoneDto } from './dto/update-zone.dto';

@Injectable()
export class ZonesRepository {
  constructor(
    @InjectRepository(Zone)
    private readonly repository: Repository<Zone>,
  ) {}

  create(newDeliveryServiceProvider: Partial<Zone>): Zone {
    return this.repository.create(newDeliveryServiceProvider);
  }

  async save(newDeliveryServiceProvider: Partial<Zone>): Promise<Zone> {
    return await this.repository.save(newDeliveryServiceProvider);
  }

  async update(
    id: number,
    updatedDeliveryServiceProvider: Partial<UpdateZoneDto>,
  ): Promise<UpdateResult> {
    return await this.repository.update(id, updatedDeliveryServiceProvider);
  }

  async findAll(): Promise<Zone[]> {
    return await this.repository.find();
  }

  async findByProps(props: UpdateZoneDto): Promise<Zone[]> {
    return await this.repository.find({ where: props });
  }

  async findOne(id: number): Promise<Zone | null> {
    return await this.repository.findOne({ where: { id: id } });
  }
}
