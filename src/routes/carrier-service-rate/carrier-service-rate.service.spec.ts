import { Test, TestingModule } from '@nestjs/testing';
import { CarrierServiceRateService } from './carrier-service-rate.service';

describe('CarrierServiceRateService', () => {
  let service: CarrierServiceRateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CarrierServiceRateService],
    }).compile();

    service = module.get<CarrierServiceRateService>(CarrierServiceRateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
