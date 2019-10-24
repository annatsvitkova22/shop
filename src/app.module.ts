import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD, APP_FILTER } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from 'src/app.controller';
import { AuthenticationController, PrintingEditionsController, BooksController, AuthorsMongoController,
  UsersController, OrdersController, OrderItemsController, AuthorsController, RolesController, PaymentsController,
  RoleInUserController, AuthorInBookController} from 'src/controllers';
import { JwtStrategy, LocalStrategy, RolesGuard, AllExceptionsFilter, RequestMiddleware, HashHelper, JwtHelper, MailerHelper } from 'src/common';
import { AuthService, AuthorsMongoService, BooksService, PrintingEditionService, UserService, OrderService, OrderItemService,
  AuthorService, RoleService, PaymentService, RoleInUsersService, AuthorInBookService} from 'src/services';
import { Enviroment, getEnv } from 'src/environment/environment';
import { BookSchema, AuthorSchema } from 'src/document';
import { AuthorMongoRepository, BookRepository } from 'src/repositories';
import { databaseProviders, printingEditionsProviders, authorInBooksProviders, paymentsProviders, authorsProviders,
  userInRolesProviders, orderItemsProviders, rolesProviders, ordersProviders, usersProviders } from 'src/providers';

const myEnvitonment: Enviroment = getEnv();

@Module({
  imports: [
    PassportModule,
    MongooseModule.forRoot(myEnvitonment.mongoConnection, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    MongooseModule.forFeature([{ name: 'Book', schema: BookSchema }]),
    MongooseModule.forFeature([{ name: 'Author', schema: AuthorSchema }]),
    JwtModule.register({
      secret: myEnvitonment.tokenSecret,
      signOptions: { expiresIn: myEnvitonment.tokenLife },
    }),
  ],
  controllers: [AppController, AuthenticationController, BooksController, AuthorsMongoController, PrintingEditionsController,
    UsersController, OrdersController, OrderItemsController, AuthorsController, RolesController, PaymentsController, RoleInUserController,
    AuthorInBookController],
  providers: [AuthService, LocalStrategy, JwtStrategy, AuthorsMongoService, BooksService, AuthorMongoRepository, BookRepository,
    PrintingEditionService, UserService, OrderService, OrderItemService, AuthorService, RoleService, PaymentService, RoleInUsersService,
    AuthorInBookService, HashHelper, MailerHelper, JwtHelper, ...authorsProviders, ...userInRolesProviders, ...rolesProviders, ...usersProviders,
    ...printingEditionsProviders, ...authorInBooksProviders, ...paymentsProviders, ...orderItemsProviders, ...ordersProviders, ...databaseProviders,
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
