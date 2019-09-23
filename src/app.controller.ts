import { Controller, Get, UseGuards, Post, Request } from '@nestjs/common';
import { AppService } from 'src/app.service';
import { Env, getEnv } from 'src/environment/environment';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';


@Controller('api')
export class AppController {
  constructor(private readonly authService: AuthService, appService: AppService) { }
 

  @Get()
  getHello(): boolean {
    let viewEnvitonment: Env = getEnv();
    return viewEnvitonment.production;
  }


  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  getProfile(@Request() req) {
    return req.user;
  }
}
