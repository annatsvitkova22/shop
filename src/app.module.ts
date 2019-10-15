import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD, APP_FILTER } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from 'src/app.controller';
import { ControllersController, AuthenticationController, PrintingEditionsController, BooksController, AuthorsMongoController,
  UsersController, OrdersController, OrderItemsController, AuthorsController, RolesController, PaymentsController,
  RoleInUserController, AuthorInBookController} from 'src/controllers';
import { JwtStrategy, LocalStrategy, RolesGuard, AllExceptionsFilter, RequestMiddleware, HashHelper, PaymentHelper } from 'src/common';
import { AuthService, AuthorsMongoService, BooksService, PrintingEditionService, UserService, OrderService, OrderItemService,
  AuthorService, RoleService, PaymentService, RoleInUsersService, AuthorInBookService} from 'src/services';
import { Enviroment, getEnv } from 'src/environment/environment';
import { BookSchema, AuthorSchema } from 'src/document';
import { AuthorMongoRepository, BookRepository} from 'src/repositories';
import { PrintingEdition, User, Order, OrderItem, Author, Role, Payment, UserInRoles, AuthorInBooks } from 'src/entity';

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
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: myEnvitonment.databaseHost,
      port: myEnvitonment.databasePort,
      username: myEnvitonment.databaseUsername,
      password: myEnvitonment.databasePassword,
      database: myEnvitonment.database,
      entities: [PrintingEdition, User, Order, OrderItem, Author, Role, Payment, UserInRoles, AuthorInBooks],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([PrintingEdition, User, Order, OrderItem, Author, Role, Payment, UserInRoles, AuthorInBooks]),
    JwtModule.register({
      secret: myEnvitonment.tokenSecret,
      signOptions: { expiresIn: myEnvitonment.tokenLife },
    })],
  controllers: [AppController, ControllersController, AuthenticationController, BooksController, AuthorsMongoController, PrintingEditionsController,
    UsersController, OrdersController, OrderItemsController, AuthorsController, RolesController, PaymentsController, RoleInUserController,
    AuthorInBookController],
  providers: [AuthService, LocalStrategy, JwtStrategy, AuthorsMongoService, BooksService, AuthorMongoRepository, BookRepository,
    PrintingEditionService, UserService, OrderService, OrderItemService, AuthorService, RoleService, PaymentService, RoleInUsersService,
    AuthorInBookService, HashHelper, PaymentHelper,
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
      .forRoutes(AuthenticationController, AppController);
  }
}
