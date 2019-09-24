import { Controller, Get, UseGuards, Post, Request, Body } from '@nestjs/common';
import { AppService } from 'src/app.service';
import { Env, getEnv } from 'src/environment/environment';

@Controller()
export class AppController {
  constructor(appService: AppService) { }

  @Get()
  getHello(): boolean {
    const viewEnvitonment: Env = getEnv();
    return viewEnvitonment.production;
  }
}
