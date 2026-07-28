import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateDeliveryServiceDto {
  @ApiProperty({
    example: 'FastExpress',
    description: 'The name of the delivery service provider',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'FE',
    description: 'The service code of the delivery service provider',
  })
  @IsString()
  @IsOptional()
  serviceCode?: string;

  @ApiProperty({
    default: true,
    description: 'Is the delivery service provider active?',
  })
  @IsBoolean()
  active: boolean;
}
