import { Entities } from 'src/enums/entities.enum';
import { DeliveryService } from 'src/routes/delivery-services/entities/delivery-service.entity';
import { WeightCatagoryRate } from 'src/routes/weight-catagory-rates/entities/weight-catagory-rate.entity';
import { Zone } from 'src/routes/zones/entities/zone.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity(Entities.Entitiy2)
export class Sector {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index()
  name: string;

  @ManyToOne(
    () => DeliveryService,
    (deliveryService) => deliveryService.sectors,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'deliveryServiceId' })
  deliveryService: DeliveryService;

  @Column()
  deliveryServiceId: number;

  @OneToMany(() => Zone, (zone) => zone.sector)
  zones: Zone[];

  @OneToMany(
    () => WeightCatagoryRate,
    (weightCatagoryRates) => weightCatagoryRates.Sector,
  )
  weightCatagoryRates: WeightCatagoryRate[];
}
