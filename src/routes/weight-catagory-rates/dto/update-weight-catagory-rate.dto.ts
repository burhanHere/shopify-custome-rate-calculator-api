import { PartialType } from '@nestjs/mapped-types';
import { CreateWeightCatagoryRateDto } from './create-weight-catagory-rate.dto';

export class UpdateWeightCatagoryRateDto extends PartialType(
  CreateWeightCatagoryRateDto,
) {}
