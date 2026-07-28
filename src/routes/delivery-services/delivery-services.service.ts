import { Injectable, Logger } from '@nestjs/common';
import { CreateDeliveryServiceDto } from './dto/create-delivery-service.dto';
import { DeliveryServicesRepository } from './delivery-services.repository';
import { DeliveryService } from './entities/delivery-service.entity';
import { UpdateResult } from 'typeorm';
import { UpdateDeliveryServiceDto } from './dto/update-delivery-service.dto';

@Injectable()
export class DeliveryServicesService {
  private readonly logger: Logger;

  constructor(
    private readonly deliveryServiceRepository: DeliveryServicesRepository,
  ) {
    this.logger = new Logger(DeliveryServicesService.name);
  }

  async create(
    createDeliveryServiceDto: CreateDeliveryServiceDto,
  ): Promise<DeliveryService> {
    this.logger.log('Creating a new delivery service provider');

    const result = await this.deliveryServiceRepository.save(
      createDeliveryServiceDto,
    );

    this.logger.log('Created a new delivery service provider');

    return result;
  }

  async findAll(): Promise<DeliveryService[]> {
    this.logger.log('Fetching all delivery service providers');

    const result = (await this.deliveryServiceRepository.findAll()) ?? [];

    this.logger.log('Fetched all delivery service providers');

    return result;
  }

  async findByProps(
    props: UpdateDeliveryServiceDto,
  ): Promise<DeliveryService[]> {
    this.logger.log('Finding delivery serivces by properties:', props);

    const result = await this.deliveryServiceRepository.findByProps(props);

    this.logger.log('Found delivery serivces successfully');

    return result;
  }

  async findOne(id: number): Promise<DeliveryService | object> {
    this.logger.log(`Fetching delivery service provider with id: ${id}`);

    const result = (await this.deliveryServiceRepository.findOne(id)) ?? {};

    this.logger.log(`Fetched delivery service provider with id: ${id}`);

    return result;
  }

  async update(
    id: number,
    updateDeliveryServiceProviderDto: UpdateDeliveryServiceDto,
  ): Promise<string> {
    this.logger.log(`Updating delivery service provider with id: ${id}`);

    const result: UpdateResult = await this.deliveryServiceRepository.update(
      id,
      updateDeliveryServiceProviderDto,
    );

    this.logger.log(`Updated delivery service provider with id: ${id}`);

    return (result.affected ?? 0) > 0
      ? 'Update successful'
      : 'No record found to update';
  }
}
