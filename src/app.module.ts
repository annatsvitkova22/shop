import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD, APP_FILTER } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from 'src/app.controller';

import { JwtStrategy, RolesGuard, AllExceptionsFilter, RequestMiddleware, HashHelper } from 'src/common';
import { Enviroment, getEnv } from 'src/environment/environment';
import { BookSchema, AuthorSchema } from 'src/document';

import { JwtHelper } from './common/jwt.helper';
import { Test } from './entity/test.entity';
import { TestRepository } from './repositories/test.repository';
import { TestService } from './services/test.service';
import { TestController } from './controllers/test.controller';

const myEnvitonment: Enviroment = getEnv();

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: myEnvitonment.tokenSecret,
      signOptions: { expiresIn: myEnvitonment.tokenLife },
    }),
  ],
  controllers: [AppController, TestController],
  providers: [ JwtStrategy,
  HashHelper, JwtHelper, TestRepository, TestService,
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
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RequestMiddleware)
      .forRoutes( AppController);
  }
}
