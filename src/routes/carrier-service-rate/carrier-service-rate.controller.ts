import { Controller, Post, Body, Header } from '@nestjs/common';
import { CarrierServiceRateService } from './carrier-service-rate.service';
import { CarrierServiceRateShopifyRequestDto } from './dto/carrier-service-rate-shopify-request.dto';
import { CarrierServiceRateResponseDto } from './dto/carrier-service-rate-response.dto';

@Controller('carrier-service-rate')
export class CarrierServiceRateController {
  constructor(
    private readonly carrierServiceRateService: CarrierServiceRateService,
  ) {}

  @Post('get-rates')
  @Header('Content-Type', 'application/json')
  async getRates(
    @Body()
    carrierServiceRateShopifyRequestDto: CarrierServiceRateShopifyRequestDto,
  ): Promise<CarrierServiceRateResponseDto> {
    return await this.carrierServiceRateService.getRates(
      carrierServiceRateShopifyRequestDto,
    );
  }
}
