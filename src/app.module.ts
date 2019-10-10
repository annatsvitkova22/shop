import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from 'src/app.controller';
import { ControllersController, AuthenticationController, PrintingEditionsController, BooksController, AuthorsMongoController,
  UsersController, OrdersController, OrderItemsController, AuthorsController, RolesController, PaymentsController,
  RoleInUserController,
  AuthorInBookController} from 'src/controllers';
import { JwtStrategy, LocalStrategy, RolesGuard, AllExceptionsFilter, RequestMiddleware } from 'src/common';
import { AuthService, AuthorsMongoService, BooksService, PrintingEditionService, UserService, OrderService, OrderItemService,
  AuthorService, RoleService, PaymentService, RoleInUsersService, AuthorInBookService} from 'src/services';
import { UsersService } from 'src/users/users.service';
import { Enviroment, getEnv } from 'src/environment/environment';
import { APP_GUARD, APP_FILTER } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { BookSchema, AuthorSchema } from 'src/document';
import { AuthorMongoRepository, BookRepository} from 'src/repositories';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrintingEdition, User, Order, OrderItem, Author, Role, Payment, UserInRoles, AuthorInBooks } from 'src/entity';
import { StripeModule } from './stripe/stripe.module';

const myEnvitonment: Enviroment = getEnv();

@Module({
  imports: [
    StripeModule,
    PassportModule,
    MongooseModule.forRoot('mongodb+srv://tsvitkova_work:rFI3VAA3eysltGbn@cluster0-mbfra.mongodb.net/nestjs-demo?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    MongooseModule.forFeature([{ name: 'Book', schema: BookSchema }]),
    MongooseModule.forFeature([{ name: 'Author', schema: AuthorSchema }]),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: '1111',
      database: 'book-shop',
      entities: [PrintingEdition, User, Order, OrderItem, Author, Role, Payment, UserInRoles, AuthorInBooks],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([PrintingEdition, User, Order, OrderItem, Author, Role, Payment, UserInRoles, AuthorInBooks]),
    JwtModule.register({
      secret: myEnvitonment.tokenSecret,
      signOptions: { expiresIn: '30m' },
    })],
  controllers: [AppController, ControllersController, AuthenticationController, BooksController, AuthorsMongoController, PrintingEditionsController,
    UsersController, OrdersController, OrderItemsController, AuthorsController, RolesController, PaymentsController, RoleInUserController,
    AuthorInBookController],
  providers: [AuthService, UsersService, LocalStrategy, JwtStrategy, AuthorsMongoService, BooksService, AuthorMongoRepository, BookRepository,
    PrintingEditionService, UserService, OrderService, OrderItemService, AuthorService, RoleService, PaymentService, RoleInUsersService,
    AuthorInBookService,
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
