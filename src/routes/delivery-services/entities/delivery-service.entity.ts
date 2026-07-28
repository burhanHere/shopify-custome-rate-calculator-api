import { Entities } from 'src/enums/entities.enum';
import { Sector } from 'src/routes/sectors/entities/sector.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity(Entities.Entitiy1)
export class DeliveryService {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  serviceCode?: string;

  @Column({ default: true })
  active: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Sector, (sector) => sector.deliveryService)
  sectors: Sector[];
}
