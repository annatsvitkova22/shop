import { Module } from '@nestjs/common';
import { AuthorsService } from 'src/services/authors.service';
import { AuthorsController } from 'src/controllers/authors.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthorSchema } from 'src/document/authors.model';
import { BookSchema } from 'src/document/books.model'
import { BooksService } from 'src/services/books.service';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Author', schema: AuthorSchema}]),
  MongooseModule.forFeature([{name: 'Book', schema: BookSchema}])],
  providers: [AuthorsService, BooksService],
  controllers: [AuthorsController]
})
export class AuthorModule {}
