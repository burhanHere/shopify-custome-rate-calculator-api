import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateWeightCatagoryRateDto {
  @ApiProperty({
    example: '0.500',
    description: 'The lower limit of the weight catagory',
  })
  @IsNumber()
  @IsNotEmpty()
  weightLowerLimit: number;

  @ApiProperty({
    example: '0.500',
    description: 'The upper limit of the weight catagory',
  })
  @IsNumber()
  @IsNotEmpty()
  weightUpperLimit: number;

  @ApiProperty({
    example: '150.00',
    description: 'The rate for the weight catagory',
  })
  @IsNumber()
  @IsNotEmpty()
  rate: number;

  @ApiProperty({
    example: '1',
    description: 'The id of the sector',
  })
  @IsNumber()
  @IsNotEmpty()
  sectorId: number;
}
