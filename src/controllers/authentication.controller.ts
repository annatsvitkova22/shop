import { Controller, Get, UseGuards, Post, Body, UseFilters } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/services/auth.service';
import { AllExceptionsFilter } from 'src/common/exception.filter'
import { RolesGuard } from 'src/common/roles.guard';
import { Roles } from 'src/common/roles.decorator';
import { ApiBearerAuth, ApiUseTags } from '@nestjs/swagger';

export interface Token {
  access_token: string,
  refresh_token: string,
}

@ApiBearerAuth()
@ApiUseTags('authentication')
@Controller('api')
export class AuthenticationController {
  constructor(private readonly authService: AuthService) { }

  @UseFilters(new AllExceptionsFilter())

  @UseGuards(AuthGuard('local'))
  @Post('login')
  public async login(@Body() req) {
     const access_token = this.authService.getToken(req);
    const refresh_token = this.authService.getRefresh(req);
    const myToken: Token = {
      access_token: access_token,
      refresh_token: refresh_token,
    }
    return  myToken;
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get('me')
  @Roles('user')
  getProfile(@Body() req) {
    return req.user;
  }
}
