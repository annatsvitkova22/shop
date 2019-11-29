import { Controller, Get, UseGuards, Post, UseFilters, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiUseTags, ApiCreatedResponse } from '@nestjs/swagger';

import { AuthService } from 'src/services';
import { AllExceptionsFilter } from 'src/common';
import { User } from 'src/entity';
import { TokenModel, AuthenticatedUserModel } from 'src/models';
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
  public async login(@Request() requ): Promise<TokenModel> {
    const tokens: TokenModel = this.authService.getRefresh(requ.user);

    return tokens;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  @ApiCreatedResponse({ description: 'The record has been successfully created.', type: TokenModel })
  public async getProfile(@Request() req): Promise<AuthenticatedUserModel> {
    const user: AuthenticatedUserModel = await this.jwtHelper.hasUser(req);

    return user;
  }
}
