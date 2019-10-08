import { Controller, Get, UseGuards, Post, Body, UseFilters, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/services/auth.service';
import { AllExceptionsFilter } from 'src/common/exception.filter';
import { RolesGuard } from 'src/common/roles.guard';
import { Roles } from 'src/common/roles.decorator';
import { ApiBearerAuth, ApiUseTags, ApiCreatedResponse } from '@nestjs/swagger';
import { User } from 'src/entity';
import { Token, CreateUserModel } from 'src/models';

@ApiBearerAuth()
@ApiUseTags('authentication')
@Controller('api')
export class AuthenticationController {
  constructor(
    private readonly authService: AuthService,
    ) { }
  @UseFilters(new AllExceptionsFilter())
  //@UseGuards(AuthGuard('local'))
  @Post('login')
  @ApiCreatedResponse({ description: 'The record has been successfully created.', type: User })
  async login(@Body() user: CreateUserModel) {
    const validateUser = await this.authService.validateUser(user);
    console.log("req");
    const getAccessToken = this.authService.getToken(validateUser);
    const getRefreshToken = this.authService.getRefresh(validateUser);
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
  getProfile(@Body() req) {
    console.log("req");
    return req.user;
  }
}
