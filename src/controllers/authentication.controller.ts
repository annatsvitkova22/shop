import { Controller, Get, UseGuards, Post, Request, Body, PayloadTooLargeException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/services/auth.service';
import { RolesGuard } from 'src/common/roles.guard';
import { Roles } from 'src/common/roles.decorator';

@Controller('api')
//@UseGuards(RolesGuard)
export class AuthenticationController {
  constructor(private readonly authService: AuthService) { }
  @UseGuards(AuthGuard('local'))
  @Post('login')
  public async login(@Body() req) {
    const access_token = this.authService.getToken(req);
    console.log(access_token);
    const refresh_token = this.authService.getRefresh(req);
    
    return  refresh_token;
  }
  
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get('me')
  @Roles('user')
  getProfile(@Body() req) {
    return req.user;
  }
}
