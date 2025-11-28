import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { WeightCatagoryRatesService } from './weight-catagory-rates.service';
import { Controllers } from 'src/enums/controller.enums';
import { CreateWeightCatagoryRateDto } from './dto/create-weight-catagory-rate.dto';
import { UpdateWeightCatagoryRateDto } from './dto/update-weight-catagory-rate.dto';

@Controller(Controllers.CONTROLLER4)
export class WeightCatagoryRatesController {
  constructor(
    private readonly weightCatagoriesService: WeightCatagoryRatesService,
  ) {}

  @Post('add-new')
  create(@Body() createWeightCatagoryRateDto: CreateWeightCatagoryRateDto) {
    return this.weightCatagoriesService.create(createWeightCatagoryRateDto);
  }

  @Get('find-all')
  findAll() {
    return this.weightCatagoriesService.findAll();
  }

  @Get('find-one-by/:id')
  findOne(@Param('id') id: number) {
    return this.weightCatagoriesService.findOne(id);
  }

  @Patch('update/:id')
  update(
    @Param('id') id: number,
    @Body() updateWeightCatagoryRateDto: UpdateWeightCatagoryRateDto,
  ) {
    return this.weightCatagoriesService.update(id, updateWeightCatagoryRateDto);
  }
}
