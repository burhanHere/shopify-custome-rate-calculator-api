import { Entities } from 'src/enums/entities.enum';
import { Sector } from 'src/routes/sectors/entities/sector.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity(Entities.Entitiy3)
export class Zone {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index()
  origin: string;

  @Column()
  @Index()
  destination: string;

  @ManyToOne(() => Sector, (sector) => sector.zones, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'sectorId' })
  sector: Sector;

  @Column()
  sectorId: number;
}
