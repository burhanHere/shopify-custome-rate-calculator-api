import { Injectable, Logger } from '@nestjs/common';
import { CarrierServiceRateShopifyRequestDto } from './dto/carrier-service-rate-shopify-request.dto';
import {
  CarrierServiceRateResponseDto,
  Rate,
} from './dto/carrier-service-rate-response.dto';
import { ZonesRepository } from '../zones/zones.repository';
import { DeliveryServicesRepository } from '../delivery-services/delivery-services.repository';
import { SectorsRepository } from '../sectors/sectors.repository';
import { WeightCatagoryRatesRepository } from '../weight-catagory-rates/weight-catagory-rates.repository';
import { WeightCatagoryRate } from '../weight-catagory-rates/entities/weight-catagory-rate.entity';
import { ConfigService } from '@nestjs/config';
import { Sector } from '../sectors/entities/sector.entity';

@Injectable()
export class CarrierServiceRateService {
  private readonly logger: Logger;
  private readonly pakistanPostDescription: string;
  private readonly pakistanPostMaxDeliveryTime: string;
  private readonly pakistanPostMinDeliveryTime: string;
  private readonly tcsAdvanceDescription: string;
  private readonly tcsAdvanceMaxDeliveryTime: string;
  private readonly tcsAdvanceMinDeliveryTime: string;
  private readonly tcsCodDescription: string;
  private readonly tcsCodMaxDeliveryTime: string;
  private readonly tcsCodMinDeliveryTime: string;
  private readonly currency: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly zoneService: ZonesRepository,
    private readonly deliveryServicesRepository: DeliveryServicesRepository,
    private readonly sectorsRepository: SectorsRepository,
    private readonly weightCatagoryRateService: WeightCatagoryRatesRepository,
  ) {
    this.logger = new Logger(CarrierServiceRateService.name);
    this.pakistanPostDescription =
      this.configService.get<string>('PAKISTAN_POST_DESCRIPTION') ?? '';
    this.tcsAdvanceDescription =
      this.configService.get<string>('TCS_ADVANCE_DESCRIPTION') ?? '';
    this.tcsCodDescription =
      this.configService.get<string>('TCS_COD_DESCRIPTION') ?? '';
    this.currency = this.configService.get<string>('CURRENCY') ?? '';
  }

  async getRates(
    carrierServiceRateShopifyRequestDto: CarrierServiceRateShopifyRequestDto,
  ): Promise<CarrierServiceRateResponseDto> {
    const result: CarrierServiceRateResponseDto = {
      rates: [],
    };

    this.logger.log('Starting rates calculation.');

    this.logger.log('Extracting shipment details from request DTO.');
    const originCity: string = String(
      carrierServiceRateShopifyRequestDto.rate.origin.city,
    ).toUpperCase();

    const destinationCity: string = String(
      carrierServiceRateShopifyRequestDto.rate.destination.city,
    ).toUpperCase();

    const totalWeight: number =
      carrierServiceRateShopifyRequestDto.rate.items.reduce(
        (sum, item) => sum + item.grams,
        0,
      ) / 1000.0; // this is in kilo-grams

    this.logger.log(
      'Fetching zone data based on origin and destination cities.',
    );
    const targetZone = await this.zoneService.findByProps({
      origin: originCity,
      destination: destinationCity,
    }); // this will give all the zones with matching origin and destination

    this.logger.log('No Zone Found for the given cities.');

    const targetSectorId: number[] = [
      1,
      ...targetZone.map((zone) => zone.sectorId),
    ]; // 1 is the sector for pakistan post as its rate calculation is only dependedn on weight so added it as constant as it can be retrievede from the zone calucation

    // filtering sectors which have active deliveryService
    const activeSectors = await this.sectorsRepository.getActiveSectors(
      targetSectorId,
      true,
    );

    if (activeSectors.length === 0) {
      this.logger.log('No Active Sectors found');
      return result;
    }

    this.logger.log('Fetching weight catagory rate information.');
    const targetWeightCatagoryRates = await Promise.all(
      activeSectors.map(
        async (sector) =>
          await this.weightCatagoryRateService.findByProps({
            sectorId: sector.id,
          }),
      ),
    );

    if (targetWeightCatagoryRates.length === 0) {
      this.logger.log('No Weight Catagory Rates Found for the given sector.');
      return result;
    }
    this.logger.log('Weight Catagory Rates Found for the given sector.');

    this.logger.log('Seprating rate of dirrerent types and calculating rates');

    const pakistanPostSector: Partial<Sector> | undefined = activeSectors.find(
      (x) => x.deliveryServiceId === 1,
    );
    const pakistanPostRates: WeightCatagoryRate[] = targetWeightCatagoryRates
      .filter((x) => x[0].sectorId === pakistanPostSector?.id)
      .flat();
    const pakistanPostFinalCharges = await this.pakistanPostRateCalculation(
      1,
      totalWeight,
      pakistanPostRates,
    );
    if (pakistanPostFinalCharges) {
      result.rates.push(pakistanPostFinalCharges);
    }

    const tcsCodSector: Partial<Sector> | undefined = activeSectors.find(
      (x) => x.deliveryServiceId === 2,
    );
    const tcsCodRates: WeightCatagoryRate[] = targetWeightCatagoryRates
      .filter((x) => x[0].sectorId === tcsCodSector?.id)
      .flat();
    let tcsCodFinalCharges: Rate | null = null;
    if (tcsCodRates.length > 0) {
      tcsCodFinalCharges = await this.tcsRateCalculation(
        2,
        totalWeight,
        tcsCodRates,
      );
    }
    if (tcsCodFinalCharges) {
      result.rates.push(tcsCodFinalCharges);
    }

    const tcsAdvanceSector: Partial<Sector> | undefined = activeSectors.find(
      (x) => x.deliveryServiceId === 3,
    );
    const tcsAdvanceRates: WeightCatagoryRate[] = targetWeightCatagoryRates
      .filter((x) => x[0].sectorId === tcsAdvanceSector?.id)
      .flat();
    let tcsAdvanceFinalCharges: Rate | null = null;
    if (tcsAdvanceRates.length > 0) {
      tcsAdvanceFinalCharges = await this.tcsRateCalculation(
        3,
        totalWeight,
        tcsAdvanceRates,
      );
    }
    if (tcsAdvanceFinalCharges) {
      result.rates.push(tcsAdvanceFinalCharges);
    }

    this.logger.log('Completed rates calculation.');

    return result;
  }

  private async pakistanPostRateCalculation(
    deliveryServiceId: number,
    totalWeight: number,
    weightCatagoryRates: WeightCatagoryRate[],
  ): Promise<Rate | null> {
    let finalRate: Rate | null = null;

    for (const weightCatagoryRate of weightCatagoryRates) {
      if (
        totalWeight >= weightCatagoryRate.weightLowerLimit &&
        totalWeight <= weightCatagoryRate.weightUpperLimit
      ) {
        const targetDeliveryService =
          await this.deliveryServicesRepository.findOne(deliveryServiceId);

        finalRate = {
          service_name: targetDeliveryService?.name ?? 'Pakistan Post',
          service_code: targetDeliveryService?.serviceCode ?? 'PKP',
          total_price: (weightCatagoryRate.rate * 100).toFixed(0), // rate in smalled unit of currency
          description: this.pakistanPostDescription,
          currency: this.currency,
          min_delivery_date: this.pakistanPostMinDeliveryTime,
          max_delivery_date: this.pakistanPostMaxDeliveryTime,
        };
        break;
      }
    }

    return finalRate;
  }

  private async tcsRateCalculation(
    deliveryServiceId: number,
    totalWeight: number,
    weightCatagoryRates: WeightCatagoryRate[],
  ): Promise<Rate | null> {
    const weightCatagoryRatesSorted = [...weightCatagoryRates];
    weightCatagoryRatesSorted.sort(
      (a, b) => a.weightLowerLimit - b.weightLowerLimit,
    );

    let finalRate: Rate | null = null;

    let rate: number = 0;

    if (totalWeight <= weightCatagoryRatesSorted[0].weightUpperLimit) {
      rate = rate + weightCatagoryRatesSorted[0].rate;
    } else if (totalWeight <= weightCatagoryRatesSorted[1].weightUpperLimit) {
      rate = rate + weightCatagoryRatesSorted[1].rate;
    } else {
      const overWeight =
        totalWeight - weightCatagoryRatesSorted[1].weightUpperLimit;
      let n: number = 0;
      for (let i = 0; i < overWeight; ) {
        n++;

        i = i + Number(weightCatagoryRatesSorted[1].weightUpperLimit);
      }

      rate =
        rate +
        weightCatagoryRatesSorted[1].rate +
        weightCatagoryRatesSorted[2].rate * n;
    }
    const targetDeliveryService =
      await this.deliveryServicesRepository.findOne(deliveryServiceId);

    finalRate = {
      service_name: targetDeliveryService?.name ?? 'TCS',
      service_code: targetDeliveryService?.serviceCode ?? 'TCS',
      total_price: (rate * 100).toFixed(0), //  to be in smalled unit of currency
      description:
        targetDeliveryService?.name === 'TCS (Advance)'
          ? this.tcsAdvanceDescription // TCS (Advance)
          : this.tcsCodDescription, // TCS (Cash On Delivery)
      currency: this.currency,
      min_delivery_date:
        targetDeliveryService?.name === 'TCS (Advance)'
          ? this.tcsAdvanceMinDeliveryTime // TCS (Advance)
          : this.tcsCodMinDeliveryTime, // TCS (Cash On Delivery)
      max_delivery_date:
        targetDeliveryService?.name === 'TCS (Advance)'
          ? this.tcsAdvanceMaxDeliveryTime // TCS (Advance)
          : this.tcsCodMaxDeliveryTime, // TCS (Cash On Delivery)
    };

    return finalRate;
  }
}

// {
//   "rate": {
//     "origin": {
//       "country": "PK",
//       "postal_code": "",
//       "province": "Punjab",
//       "city": "Lahore",
//       "name": "string",
//       "address1": "string",
//       "address2": null,
//       "address3": null,
//       "phone": null,
//       "fax": null,
//       "email": null,
//       "address_type": null,
//       "company_name": "string"
//     },
//     "destination": {
//       "country": "PK",
//       "postal_code": "",
//       "province": "Punjab",
//       "city": "Burewala",
//       "name": "string",
//       "address1": "string",
//       "address2": null,
//       "address3": null,
//       "phone": null,
//       "fax": null,
//       "email": null,
//       "address_type": null,
//       "company_name": "string"
//     },
//     "items": [
//       {
//         "name": "string",
//         "sku": "string",
//         "quantity": 1,
//         "grams": 1500,
//         "price": 0,
//         "vendor": "string",
//         "requires_shipping": true,
//         "taxable": true,
//         "fulfillment_service": "string",
//         "properties": {},
//         "product_id": 0,
//         "variant_id": 0
//       }
//     ],
//     "currency": "PKR",
//     "locale": "en"
//   }
// }
