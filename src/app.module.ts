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

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: "secretKey",
      signOptions: { expiresIn: '30m' },
    })],
  controllers: [AppController, ControllersController, AuthenticationController],
  providers: [AppService, AuthService, UsersService, LocalStrategy, JwtStrategy],
})
export class AppModule { }

