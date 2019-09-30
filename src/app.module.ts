import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
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
import { APP_GUARD, APP_FILTER } from '@nestjs/core';
import { RolesGuard } from 'src/common/roles.guard'
import { AllExceptionsFilter } from 'src/common/exception.filter'
import { RequestMiddleware } from 'src/common/request.middleware'

const myEnvitonment: Env = getEnv();

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
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule implements NestModule{ 
  configure(consumer: MiddlewareConsumer){
    consumer
      .apply(RequestMiddleware)
      .forRoutes(AuthenticationController, AppController);
  }
}

