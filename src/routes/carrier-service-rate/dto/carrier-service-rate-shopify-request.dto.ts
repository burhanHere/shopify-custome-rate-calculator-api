import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

class Item {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  sku?: string;

  @ApiProperty()
  @IsNumber()
  quantity: number;

  @ApiProperty()
  @IsNumber()
  grams: number;

  @ApiProperty()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsString()
  vendor: string;

  @ApiProperty()
  @IsBoolean()
  requires_shipping: boolean;

  @ApiProperty()
  @IsBoolean()
  taxable: boolean;

  @ApiProperty()
  @IsString()
  fulfillment_service: string;

  @ApiProperty({ nullable: true })
  @IsOptional()
  properties?: any;

  @ApiProperty()
  @IsNumber()
  product_id: number;

  @ApiProperty()
  @IsNumber()
  variant_id: number;
}

class Location {
  @ApiProperty({ example: 'CA' })
  @IsString()
  country: string;

  @ApiProperty({ example: 'K2P1L4' })
  @IsString()
  postal_code: string;

  @ApiProperty({ example: 'ON' })
  @IsString()
  province: string;

  @ApiProperty({ example: 'Ottawa' })
  @IsString()
  city: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ default: null, example: '150 Elgin St.' })
  @IsOptional()
  @IsString()
  address1?: string;

  @ApiProperty({ default: null })
  @IsOptional()
  @IsString()
  address2?: string;

  @ApiProperty({ default: null })
  @IsOptional()
  @IsString()
  address3?: string;

  @ApiProperty({ default: null })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ default: null })
  @IsOptional()
  @IsString()
  fax?: string;

  @ApiProperty({ default: null })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiProperty({ default: null })
  @IsOptional()
  @IsString()
  address_type?: string;

  @ApiProperty({ example: "Jamie's Company" })
  @IsOptional()
  @IsString()
  company_name?: string;
}

class Rate {
  @ApiProperty()
  @ValidateNested()
  @Type(() => Location)
  origin: Location;

  @ApiProperty()
  @ValidateNested()
  @Type(() => Location)
  destination: Location;

  @ApiProperty({ type: [Item] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Item)
  items: Item[];

  @ApiProperty({ example: 'USD' })
  @IsString()
  currency: string;

  @ApiProperty({ example: 'en' })
  @IsString()
  locale: string;
}

export class CarrierServiceRateShopifyRequestDto {
  @ApiProperty()
  @ValidateNested()
  @Type(() => Rate)
  rate: Rate;
}
