import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Controllers } from 'src/enums/controller.enums';

@Controller(Controllers.CONTROLLER1)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
