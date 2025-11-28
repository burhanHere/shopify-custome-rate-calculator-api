import { Test, TestingModule } from '@nestjs/testing';
import { CarrierServiceRateController } from './carrier-service-rate.controller';
import { CarrierServiceRateService } from './carrier-service-rate.service';

describe('CarrierServiceRateController', () => {
  let controller: CarrierServiceRateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarrierServiceRateController],
      providers: [CarrierServiceRateService],
    }).compile();

    controller = module.get<CarrierServiceRateController>(CarrierServiceRateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
