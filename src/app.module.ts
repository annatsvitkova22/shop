import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';
import { ControllersController } from 'src/controllers/requests.controller';
import { AuthenticationController } from 'src/controllers/authentication.controller'
import { JwtStrategy } from 'src/common/jwt.strategy';
import { LocalStrategy } from 'src/common/local.strategy';
import { AuthService } from 'src/services/auth.service';
import { UsersService } from 'src/users/users.service';
import { Env, getEnv } from 'src/environment/environment';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/common/roles.guard'

const myEnvitonment: Env = getEnv();
const fs = require('fs');

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: myEnvitonment.tokenSecret,
      signOptions: { expiresIn: '30m' },
    })],
  controllers: [AppController, ControllersController, AuthenticationController],
  providers: [AppService, AuthService, UsersService, LocalStrategy, JwtStrategy, 
    {
    provide: APP_GUARD,
    useClass: RolesGuard,
  }],
})
export class AppModule { }

