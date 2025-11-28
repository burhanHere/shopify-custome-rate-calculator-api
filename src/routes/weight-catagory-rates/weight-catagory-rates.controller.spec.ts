import { Test, TestingModule } from '@nestjs/testing';
import { WeightCatagoryRatesController } from './weight-catagory-rates.controller';
import { WeightCatagoryRatesService } from './weight-catagory-rates.service';

describe('WeightCatagoryRatesController', () => {
  let controller: WeightCatagoryRatesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WeightCatagoryRatesController],
      providers: [WeightCatagoryRatesService],
    }).compile();

    controller = module.get<WeightCatagoryRatesController>(
      WeightCatagoryRatesController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
