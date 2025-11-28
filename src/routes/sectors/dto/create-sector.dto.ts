import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateSectoreDto {
  @ApiProperty({
    example: 'DR1 - Different Region 1',
    description: 'The name of the sector',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 1,
    description: 'The id of the service provider',
  })
  @Type(() => Number)
  @IsNumber()
  deliveryServiceId: number;
}
