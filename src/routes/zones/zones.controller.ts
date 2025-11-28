import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { ZonesService } from './zones.service';
import { CreateZoneDto } from './dto/create-zone.dto';
import { UpdateZoneDto } from './dto/update-zone.dto';
import { Controllers } from 'src/enums/controller.enums';

@Controller(Controllers.CONTROLLER6)
export class ZonesController {
  constructor(private readonly zonesService: ZonesService) {}

  @Post('add-new')
  create(@Body() createZoneDto: CreateZoneDto) {
    return this.zonesService.create(createZoneDto);
  }

  @Get('find-all')
  findAll() {
    return this.zonesService.findAll();
  }

  @Get('find-one-by/:id')
  findOne(@Param('id') id: string) {
    return this.zonesService.findOne(+id);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateZoneDto: UpdateZoneDto) {
    return this.zonesService.update(+id, updateZoneDto);
  }
}
