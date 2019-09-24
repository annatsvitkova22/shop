import { Controller, Get, UseGuards, Post, Request, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/services/auth.service';

@Controller('api')
export class AppController {
  constructor(private readonly authService: AuthService) { }
  @Post('login')
  public async login(@Body() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  getProfile(@Request() req) {
    const user = req.user;
    return user;
  }
}