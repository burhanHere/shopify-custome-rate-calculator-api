import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeliveryService } from './entities/delivery-service.entity';
import { Repository, UpdateResult } from 'typeorm';
import { UpdateDeliveryServiceDto } from './dto/update-delivery-service.dto';

@Injectable()
export class DeliveryServicesRepository {
  constructor(
    @InjectRepository(DeliveryService)
    private readonly repository: Repository<DeliveryService>,
  ) {}

  create(
    newDeliveryServiceProvider: Partial<DeliveryService>,
  ): DeliveryService {
    return this.repository.create(newDeliveryServiceProvider);
  }

  async save(
    newDeliveryServiceProvider: Partial<DeliveryService>,
  ): Promise<DeliveryService> {
    return await this.repository.save(newDeliveryServiceProvider);
  }

  async update(
    id: number,
    updatedDeliveryServiceProvider: Partial<UpdateDeliveryServiceDto>,
  ): Promise<UpdateResult> {
    return await this.repository.update(id, updatedDeliveryServiceProvider);
  }

  async findAll(): Promise<DeliveryService[]> {
    return await this.repository.find();
  }

  async findByProps(
    props: UpdateDeliveryServiceDto,
  ): Promise<DeliveryService[]> {
    return await this.repository.find({ where: props });
  }

  async findOne(id: number): Promise<DeliveryService | null> {
    return await this.repository.findOne({ where: { id: id } });
  }
}
