import { Controller, Get, UseGuards, Post, Body, UseFilters, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiUseTags, ApiCreatedResponse } from '@nestjs/swagger';

import { AuthService } from 'src/services';
import { RolesGuard, Roles, AllExceptionsFilter } from 'src/common';
import { User } from 'src/entity';
import { Token } from 'src/models';

@ApiBearerAuth()
@ApiUseTags('Authentication')
@Controller('api')
export class AuthenticationController {
  constructor(
    private readonly authService: AuthService,
    ) { }
  @UseFilters(new AllExceptionsFilter())
  @UseGuards(AuthGuard('local'))
  @Post('login')
  @ApiCreatedResponse({ description: 'The record has been successfully created.', type: User })
  public async login(@Body() req, @Request() requ): Promise<Token> {
    const getAccessToken = this.authService.getToken(requ.user);
    const getRefreshToken = this.authService.getRefresh(requ.user);
    const myToken: Token = {
      accessToken: getAccessToken,
      refreshToken: getRefreshToken,
    };

    return myToken;
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get('me')
  @ApiCreatedResponse({ description: 'The record has been successfully created.', type: Token })
  @Roles('user')
  getProfile(@Body() req, @Request() requ): string {

    return requ.user;
  }
}
