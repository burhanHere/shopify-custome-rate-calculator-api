import { PartialType } from '@nestjs/mapped-types';
import { CreateSectoreDto } from './create-sector.dto';

export class UpdateSectoreDto extends PartialType(CreateSectoreDto) {}
