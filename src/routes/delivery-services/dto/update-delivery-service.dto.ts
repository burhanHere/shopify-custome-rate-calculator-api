import { PartialType } from '@nestjs/mapped-types';
import { CreateDeliveryServiceDto } from './create-delivery-service.dto';

export class UpdateDeliveryServiceDto extends PartialType(
  CreateDeliveryServiceDto,
) {}
