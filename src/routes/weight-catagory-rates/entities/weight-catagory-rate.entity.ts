import { Entities } from 'src/enums/entities.enum';
import { Sector } from 'src/routes/sectors/entities/sector.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity(Entities.Entitiy4)
export class WeightCatagoryRate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal' })
  weightLowerLimit: number;

  @Column({ type: 'decimal' })
  weightUpperLimit: number;

  @Column()
  rate: number;

  @ManyToOne(() => Sector, (sector) => sector.weightCatagoryRates, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'sectorId' })
  Sector: Sector;

  @Column()
  sectorId: number;
}
