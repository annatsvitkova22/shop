import { Controller, Get, UseGuards, Post, Request, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/services/auth.service';

@Controller('api')
export class AuthenticationController {
  constructor(private readonly authService: AuthService) { }
 
  @UseGuards(AuthGuard('local'))
  @Post('login')
  public async login(@Body() req) {

    return this.authService.login(req);
  }


  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  getProfile(@Request() req) {
    return req.user;
  }
}