import { Module } from '@nestjs/common';
import { AuthorsService } from 'src/services/authors.service';
import { AuthorsController } from 'src/controllers/authors.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthorSchema } from 'src/document/authors.model';
import { BookSchema } from 'src/document/books.model';
import { BooksService } from 'src/services/books.service';
import { AuthorRepository } from 'src/repositories/author.repository';
import { BookRepository } from 'src/repositories/book.repository';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Author', schema: AuthorSchema }]),
  MongooseModule.forFeature([{ name: 'Book', schema: BookSchema }])],
  providers: [AuthorsService, BooksService, AuthorRepository, BookRepository],
  controllers: [AuthorsController],
})
export class AuthorModule { }
