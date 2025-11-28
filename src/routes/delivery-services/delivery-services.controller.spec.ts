import { Test, TestingModule } from '@nestjs/testing';
import { DeliveryServiceProvidersController } from './delivery-services.controller';
import { DeliveryServiceProviderService } from './delivery-services.service';

describe('DeliveryServiceProviderController', () => {
  let controller: DeliveryServiceProvidersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeliveryServiceProvidersController],
      providers: [DeliveryServiceProviderService],
    }).compile();

    controller = module.get<DeliveryServiceProvidersController>(
      DeliveryServiceProvidersController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
