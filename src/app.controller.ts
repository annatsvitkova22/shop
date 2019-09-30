import { Controller, Get, UseFilters } from '@nestjs/common';
import { AppService } from 'src/app.service';
import { Env, getEnv } from 'src/environment/environment';
import { AllExceptionsFilter } from 'src/common/exception.filter'

@Controller()
export class AppController {
  constructor(appService: AppService) { }

  @UseFilters(new AllExceptionsFilter())

  @Get()
  getEnvironment(): boolean {
    const viewEnvironment: Env = getEnv();
    return viewEnvironment.production;
  }
}
