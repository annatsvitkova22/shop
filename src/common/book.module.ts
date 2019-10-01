import { Module } from '@nestjs/common';
import { BooksService } from 'src/services/books.service';
import { BooksController } from 'src/controllers/books.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BookSchema } from 'src/models/books.model';
import { AuthorsService } from 'src/services/authors.service'
import { AuthorSchema } from 'src/models/authors.model'

@Module({
  imports: [MongooseModule.forFeature([{name: 'Book', schema: BookSchema}]),
  MongooseModule.forFeature([{name: 'Author', schema: AuthorSchema}])],
  providers: [BooksService, AuthorsService],
  controllers: [BooksController]
})
export class BookModule {}
