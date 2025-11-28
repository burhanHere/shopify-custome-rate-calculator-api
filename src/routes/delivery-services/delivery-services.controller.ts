import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { DeliveryServicesService } from './delivery-services.service';
import { CreateDeliveryServiceDto } from './dto/create-delivery-service.dto';
import { UpdateDeliveryServiceDto } from './dto/update-delivery-service.dto';
import { Controllers } from 'src/enums/controller.enums';

@Controller(Controllers.CONTROLLER2)
export class DeliveryServicesController {
  constructor(
    private readonly deliveryServicesService: DeliveryServicesService,
  ) {}

  @Post('add-new')
  async create(
    @Body() createDeliveryServiceProviderDto: CreateDeliveryServiceDto,
  ) {
    return this.deliveryServicesService.create(
      createDeliveryServiceProviderDto,
    );
  }

  @Get('find-all')
  async findAll() {
    return this.deliveryServicesService.findAll();
  }

  @Get('find-one-by/:id')
  async findOne(@Param('id') id: number) {
    return await this.deliveryServicesService.findOne(id);
  }

  @Patch('update/:id')
  async update(
    @Param('id') id: number,
    @Body() updateDeliveryServiceProviderDto: UpdateDeliveryServiceDto,
  ) {
    return this.deliveryServicesService.update(
      id,
      updateDeliveryServiceProviderDto,
    );
  }
}
