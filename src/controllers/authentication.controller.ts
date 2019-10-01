import { Controller, Get, UseGuards, Post, Body, UseFilters, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/services/auth.service';
import { AllExceptionsFilter } from 'src/common/exception.filter'
import { RolesGuard } from 'src/common/roles.guard';
import { Roles } from 'src/common/roles.decorator';
import { ApiBearerAuth, ApiUseTags, ApiCreatedResponse } from '@nestjs/swagger';
import { User } from 'src/users/users.service'
import { ApiModelProperty, ApiProduces } from '@nestjs/swagger';

export class Token {
  @ApiModelProperty()
  @ApiProduces()
  access_token: string;
  @ApiModelProperty()
  refresh_token: string;
}

@ApiBearerAuth()
@ApiUseTags('authentication')
@Controller('api')
export class AuthenticationController {
  constructor(private readonly authService: AuthService) { }

  @UseFilters(new AllExceptionsFilter())

  @UseGuards(AuthGuard('local'))
  @Post('login')
  @ApiCreatedResponse({ description: 'The record has been successfully created.', type: User })
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
  @ApiCreatedResponse({ description: 'The record has been successfully created.', type: Token })
  @Roles('user')
  getProfile(@Body() req) {
    return req.user;
  }
}
