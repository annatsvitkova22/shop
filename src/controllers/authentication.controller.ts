import { Controller, Get, UseGuards, Post, Request, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/services/auth.service';

@Controller('api')
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
  getProfile(@Request() req) {
    return req.user;
  }
}