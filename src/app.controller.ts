import { Controller, Get, UseFilters } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';

import { Enviroment, getEnv } from 'src/environment/environment';
import { AllExceptionsFilter } from 'src/common/';

@ApiUseTags('Environment')
@Controller()
export class AppController {

  @UseFilters(new AllExceptionsFilter())
  @Get()
  getEnvironment(): boolean {
    const viewEnvironment: Enviroment = getEnv();
    return viewEnvironment.production;
  }
}
