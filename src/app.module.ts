import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD, APP_FILTER } from '@nestjs/core';

import { AppController } from 'src/app.controller';
import { AuthenticationController, PrintingEditionsController, UsersController, OrdersController, OrderItemsController,
  AuthorsController, RolesController, PaymentsController, RoleInUserController, AuthorInBookController} from 'src/controllers';
import { JwtStrategy, LocalStrategy, RolesGuard, AllExceptionsFilter, RequestMiddleware, HashHelper, JwtHelper,
  MailerHelper, UuidHelper } from 'src/common';
import { AuthService, PrintingEditionService, UserService, OrderService, OrderItemService, AuthorService, RoleService, PaymentService,
  RoleInUsersService, AuthorInBookService} from 'src/services';
import { Enviroment, getEnv } from 'src/environment/environment';
import { RoleRepository, OrderRepository, OrderItemRepository, PaymentRepository, AuthorRepository, PrintingEditionRepository,
  AuthorInBookRepository, UserInRoleRepository, UserRepository } from 'src/repositories';
import { databaseProviders} from 'src/providers';

const myEnvitonment: Enviroment = getEnv();

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: myEnvitonment.tokenSecret,
      signOptions: { expiresIn: myEnvitonment.tokenLife },
    }),
  ],
  controllers: [AppController, AuthenticationController, PrintingEditionsController, UsersController, OrdersController, OrderItemsController,
    AuthorsController, RolesController, PaymentsController, RoleInUserController, AuthorInBookController],
  providers: [AuthService, LocalStrategy, JwtStrategy, PrintingEditionService, UserService, OrderService, OrderItemService, AuthorService,
    RoleService, PaymentService, RoleInUsersService, AuthorInBookService, HashHelper, MailerHelper, JwtHelper, UserInRoleRepository, RoleRepository,
    UserRepository, UserInRoleRepository, PrintingEditionRepository, AuthorInBookRepository, AuthorRepository, PaymentRepository, OrderItemRepository,
    OrderRepository, ...databaseProviders, UuidHelper,
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
      .forRoutes(AuthenticationController, AppController, UsersController, MailerHelper);
  }
}
