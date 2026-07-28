import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { Controllers } from 'src/enums/controller.enums';
import { CreateWeightCategoryRateDto } from './dto/create-weight-category-rate.dto';
import { UpdateWeightCategoryRateDto } from './dto/update-weight-category-rate.dto';
import {WeightCategoryRatesService} from "./weight-category-rates.service";

@Controller(Controllers.CONTROLLER4)
export class WeightCategoryRatesController {
  constructor(
    private readonly weightCategoriesService: WeightCategoryRatesService,
  ) {}

  @Post('add-new')
  create(@Body() createWeightCategoryRateDto: CreateWeightCategoryRateDto) {
    return this.weightCategoriesService.create(createWeightCategoryRateDto);
  }

  @Get('find-all')
  findAll() {
    return this.weightCategoriesService.findAll();
  }

  @Get('find-one-by/:id')
  findOne(@Param('id') id: number) {
    return this.weightCategoriesService.findOne(id);
  }

  @Patch('update/:id')
  update(
    @Param('id') id: number,
    @Body() updateWeightCategoryRateDto: UpdateWeightCategoryRateDto,
  ) {
    return this.weightCategoriesService.update(id, updateWeightCategoryRateDto);
  }
}
