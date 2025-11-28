import { Test, TestingModule } from '@nestjs/testing';
import { DeliveryServiceProviderService } from './delivery-services.service';

describe('DeliveryServiceProviderService', () => {
  let service: DeliveryServiceProviderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeliveryServiceProviderService],
    }).compile();

    service = module.get<DeliveryServiceProviderService>(DeliveryServiceProviderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
