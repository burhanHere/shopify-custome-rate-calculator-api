import { Injectable, Logger } from '@nestjs/common';
import { CreateZoneDto } from './dto/create-zone.dto';
import { UpdateZoneDto } from './dto/update-zone.dto';
import { ZonesRepository } from './zones.repository';
import { Zone } from './entities/zone.entity';
import { UpdateResult } from 'typeorm';

@Injectable()
export class ZonesService {
  private readonly logger: Logger;

  constructor(private readonly zoneRepository: ZonesRepository) {
    this.logger = new Logger(ZonesService.name);
  }

  async create(createZoneDto: CreateZoneDto): Promise<Zone> {
    this.logger.log('Creating a new zone');

    const result = await this.zoneRepository.save(createZoneDto);

    this.logger.log('Zone created successfully');

    return result;
  }

  async findAll(): Promise<Zone[]> {
    this.logger.log('Fetching all zones');

    const result = await this.zoneRepository.findAll();

    this.logger.log('Zones fetched successfully');

    return result;
  }

  async findByProps(prop: UpdateZoneDto): Promise<Zone[]> {
    this.logger.log('Finding zones by properties:', prop);

    const result: Zone[] = await this.zoneRepository.findByProps(prop);

    this.logger.log('Zones found successfully');

    return result;
  }

  async findOne(id: number): Promise<Zone | object> {
    this.logger.log(`Fetching zone with id: ${id}`);

    const result = (await this.zoneRepository.findOne(id)) ?? {};

    this.logger.log(`Zone with id: ${id} fetched successfully`);

    return result;
  }

  async update(id: number, updateZoneDto: UpdateZoneDto) {
    this.logger.log(`Updating zone with id: ${id}`);

    const result: UpdateResult = await this.zoneRepository.update(
      id,
      updateZoneDto,
    );

    this.logger.log(`Zone with id: ${id} updated successfully`);

    return (result.affected ?? 0) > 0
      ? 'Update successful'
      : 'No record found to update';
  }
}
