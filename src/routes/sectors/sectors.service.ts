import { Injectable, Logger } from '@nestjs/common';
import { CreateSectoreDto } from './dto/create-sector.dto';
import { UpdateSectoreDto } from './dto/update-sector.dto';
import { SectorsRepository } from './sectors.repository';
import { Sector } from './entities/sector.entity';
import { UpdateResult } from 'typeorm';

@Injectable()
export class SectorsService {
  private readonly logger: Logger;

  constructor(private readonly sectorsRepository: SectorsRepository) {
    this.logger = new Logger(SectorsService.name);
  }

  async create(createSectoreDto: CreateSectoreDto): Promise<Sector> {
    this.logger.log('Creating a new sectore');

    const result = await this.sectorsRepository.save(createSectoreDto);

    this.logger.log('Created a new sectore');

    return result;
  }

  async findAll(): Promise<Sector[]> {
    this.logger.log('Fetching all sectors.');

    const result = (await this.sectorsRepository.findAll()) ?? [];

    this.logger.log('Fetched all sectors.');

    return result;
  }

  async findOne(id: number): Promise<Sector | object> {
    this.logger.log(`Fetching sector with id: ${id}`);

    const result = (await this.sectorsRepository.findOne(id)) ?? {};

    this.logger.log(`Fetched sector with id: ${id}`);

    return result;
  }

  async update(
    id: number,
    updateSectoreDto: UpdateSectoreDto,
  ): Promise<string> {
    this.logger.log(`Updating sector with id: ${id}`);

    const result: UpdateResult = await this.sectorsRepository.update(
      id,
      updateSectoreDto,
    );

    this.logger.log(`Updated sector with id: ${id}`);

    return (result.affected ?? 0) > 0
      ? 'Update successful'
      : 'No record found to update';
  }
}
