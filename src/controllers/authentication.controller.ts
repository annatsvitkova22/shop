import { Controller, Get, UseGuards, Post, Request, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/services/auth.service';
import { RolesGuard } from 'src/common/roles.guard';
import { Roles } from 'src/common/roles.decorator';
import { Env, getEnv } from 'src/environment/environment';

const myEnvitonment: Env = getEnv();

@Controller('api')
@UseGuards(RolesGuard)
export class AuthenticationController {
  constructor(private readonly authService: AuthService) { }
 
  @UseGuards(AuthGuard('local'))
  @Post('login')
  public async login(@Body() req) {
    const log = this.authService.getToken(req);
    console.log(log);
    return this.authService.getRefresh(req);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  @Roles('admin')
  getProfile(@Body() req) {
    return req.user;
  }
}
