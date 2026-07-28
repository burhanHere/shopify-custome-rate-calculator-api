import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateZoneDto {
  @ApiProperty({ example: 'Lahore', description: 'Origin city' })
  @IsString()
  origin: string;

  @ApiProperty({ example: 'Okara', description: 'Destination city' })
  @IsString()
  destination: string;

  @ApiProperty({ example: 1, description: 'Sector ID' })
  @IsNumber()
  sectorId: number;
}
