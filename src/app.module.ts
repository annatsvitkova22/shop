import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from 'src/app.controller';
import { ControllersController } from 'src/controllers/requests.controller';
import { AuthenticationController } from 'src/controllers/authentication.controller';
import { JwtStrategy } from 'src/common/jwt.strategy';
import { LocalStrategy } from 'src/common/local.strategy';
import { AuthService } from 'src/services/auth.service';
import { UsersService } from 'src/users/users.service';
import { Enviroment, getEnv } from 'src/environment/environment';
import { APP_GUARD, APP_FILTER } from '@nestjs/core';
import { RolesGuard } from 'src/common/roles.guard';
import { AllExceptionsFilter } from 'src/common/exception.filter';
import { RequestMiddleware } from 'src/common/request.middleware';
import { MongooseModule } from '@nestjs/mongoose';
import { BookSchema } from 'src/document/books.model';
import { AuthorSchema } from 'src/document/authors.model';
import { AuthorsService } from 'src/services/authors.service';
import { BooksService } from 'src/services/books.service';
import { AuthorRepository } from 'src/repositories/author.repository';
import { BookRepository } from 'src/repositories/book.repository';
import { AuthorsController } from 'src/controllers/authors.controller';
import { BooksController } from 'src/controllers/books.controller';

const myEnvitonment: Enviroment = getEnv();

@Module({
  imports: [
    PassportModule,
    MongooseModule.forRoot('mongodb+srv://tsvitkova_work:rFI3VAA3eysltGbn@cluster0-mbfra.mongodb.net/nestjs-demo?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    MongooseModule.forFeature([{ name: 'Book', schema: BookSchema }]),
    MongooseModule.forFeature([{ name: 'Author', schema: AuthorSchema }]),
    JwtModule.register({
      secret: myEnvitonment.tokenSecret,
      signOptions: { expiresIn: '30m' },
    })],
  controllers: [AppController, ControllersController, AuthenticationController, BooksController, AuthorsController ],
  providers: [AuthService, UsersService, LocalStrategy, JwtStrategy, AuthorsService, BooksService, AuthorRepository, BookRepository,
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
