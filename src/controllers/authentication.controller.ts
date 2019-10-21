import { Controller, Get, UseGuards, Post, UseFilters, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiUseTags, ApiCreatedResponse } from '@nestjs/swagger';

import { AuthService } from 'src/services';
import { Roles, AllExceptionsFilter } from 'src/common';
import { User } from 'src/entity';
import { Token, ValidateUser } from 'src/models';
import { JwtHelper } from 'src/common/jwt.helper';

@ApiBearerAuth()
@ApiUseTags('Authentication')
@Controller('api')
export class AuthenticationController {
  constructor(
    private readonly authService: AuthService,
    public jwtHelper: JwtHelper,
    ) { }
  @UseFilters(new AllExceptionsFilter())
  @UseGuards(AuthGuard('local'))
  @Post('login')
  @ApiCreatedResponse({ description: 'The record has been successfully created.', type: User })
  public async login(@Request() requ): Promise<Token> {

    const getAccessToken = this.authService.getToken(requ.user);
    const getRefreshToken = this.authService.getRefresh(requ.user);
    const myToken: Token = {
      accessToken: getAccessToken,
      refreshToken: getRefreshToken,
    };

    return myToken;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  @ApiCreatedResponse({ description: 'The record has been successfully created.', type: Token })
  @Roles('user')
  public async getProfile(@Request() req): Promise<ValidateUser> {
    const user: ValidateUser = await this.jwtHelper.hasUser(req);

    return user;
  }
}
