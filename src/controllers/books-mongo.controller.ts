import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { ApiUseTags, ApiOperation } from '@nestjs/swagger';

import { BooksService } from 'src/services/book.service';
import { CreateBookModel, UpdateBookModel } from 'src/models';
import { BookDocument } from 'src/document';

@ApiUseTags('Book in Mongo')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) { }

  @Get()
  @ApiOperation({ title: 'Search all books'})
  public async getAllBooks(): Promise<UpdateBookModel[]>  {
    const books: UpdateBookModel[] = await this.booksService.getBooks();

    return books;
  }

  @Get(':id')
  @ApiOperation({ title: 'Search books by id'})
  public async getBook(@Param('id') bookId: string) {
    const result = await this.booksService.getBookById(bookId);

    return { result };
  }

  @Post()
  @ApiOperation({ title: 'Create book'})
  public async createBook(@Body() createBook: CreateBookModel): Promise<BookDocument>  {
    const getBook: BookDocument = await this.booksService.createBook(createBook);

    return getBook ;
  }

  @Put()
  @ApiOperation({ title: 'Update book by id'})
  public async updateBook(
    @Body() updateBook: UpdateBookModel): Promise<BookDocument>  {
    const book: BookDocument = await this.booksService.updateBook(updateBook);

    return book;
  }

  @Delete(':id')
  @ApiOperation({ title: 'Delete book by id'})
  public async removeBook(@Param('id') bookId: string): Promise<boolean> {
    await this.booksService.deleteBook(bookId);

    return true;
  }
}
