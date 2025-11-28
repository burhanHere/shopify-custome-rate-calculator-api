import { Test, TestingModule } from '@nestjs/testing';
import { WeightCatagoryRatesService } from './weight-catagory-rates.service';

describe('WeightCatagoriesService', () => {
  let service: WeightCatagoryRatesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WeightCatagoryRatesService],
    }).compile();

    service = module.get<WeightCatagoryRatesService>(
      WeightCatagoryRatesService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
