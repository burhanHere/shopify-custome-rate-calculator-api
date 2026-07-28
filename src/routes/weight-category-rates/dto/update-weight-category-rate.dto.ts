import { PartialType } from '@nestjs/mapped-types';
import { CreateWeightCategoryRateDto } from './create-weight-category-rate.dto';

export class UpdateWeightCategoryRateDto extends PartialType(
  CreateWeightCategoryRateDto,
) {}
