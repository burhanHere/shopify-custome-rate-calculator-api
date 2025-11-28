import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { SectorsService } from './sectors.service';
import { CreateSectoreDto } from './dto/create-sector.dto';
import { UpdateSectoreDto } from './dto/update-sector.dto';
import { Controllers } from 'src/enums/controller.enums';

@Controller(Controllers.CONTROLLER3)
export class SectorsController {
  constructor(private readonly sectoresService: SectorsService) {}

  @Post('add-new')
  create(@Body() createSectoreDto: CreateSectoreDto) {
    return this.sectoresService.create(createSectoreDto);
  }

  @Get('find-all')
  findAll() {
    return this.sectoresService.findAll();
  }

  @Get('find-one-by/:id')
  findOne(@Param('id') id: number) {
    return this.sectoresService.findOne(+id);
  }

  @Patch('update/:id')
  update(@Param('id') id: number, @Body() updateSectoreDto: UpdateSectoreDto) {
    return this.sectoresService.update(+id, updateSectoreDto);
  }
}
