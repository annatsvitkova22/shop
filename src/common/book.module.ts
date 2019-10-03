import { Module } from '@nestjs/common';
import { BooksService } from 'src/services/books.service';
import { BooksController } from 'src/controllers/books.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BookSchema } from 'src/document/books.model';
import { AuthorsService } from 'src/services/authors.service';
import { AuthorSchema } from 'src/document/authors.model';
import { BookRepository } from 'src/repositories/book.repository';
import { AuthorRepository } from 'src/repositories/author.repository';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Book', schema: BookSchema }]),
  MongooseModule.forFeature([{ name: 'Author', schema: AuthorSchema }])],
  providers: [BooksService, AuthorsService, BookRepository, AuthorRepository],
  controllers: [BooksController],
})
export class BookModule { }
