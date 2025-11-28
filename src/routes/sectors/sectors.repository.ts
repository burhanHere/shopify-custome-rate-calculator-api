import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Sector } from './entities/sector.entity';

@Injectable()
export class SectorsRepository {
  constructor(
    @InjectRepository(Sector)
    private readonly repository: Repository<Sector>,
  ) {}

  create(newSector: Partial<Sector>): Sector {
    return this.repository.create(newSector);
  }

  async save(newSector: Partial<Sector>): Promise<Sector> {
    return await this.repository.save(newSector);
  }

  async update(
    id: number,
    updatedSector: Partial<Sector>,
  ): Promise<UpdateResult> {
    return await this.repository.update(id, updatedSector);
  }

  async findAll(): Promise<Sector[]> {
    return await this.repository.find();
  }

  async findOne(id: number): Promise<Sector | null> {
    return await this.repository.findOne({ where: { id: id } });
  }

  async getActiveSectors(
    sectorIds: number[],
    deliverSericeStatus: boolean,
  ): Promise<Partial<Sector>[]> {
    const result = await this.repository
      .createQueryBuilder('s')
      .innerJoin('s.deliveryService', 'ds')
      .where('ds.active = :active', { active: deliverSericeStatus })
      .andWhere('s.id IN (:...ids)', { ids: sectorIds })
      .select(['s.*'])
      .getRawMany();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return result;
  }
}
