import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { ApiUseTags, ApiOperation } from '@nestjs/swagger';

import { BooksService } from 'src/services/books.service';
import { CreateBookModel, UpdateBookModel } from 'src/models';

@ApiUseTags('Books table')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) { }

  @Post()
  @ApiOperation({ title: 'Create book'})
  public async createBook(@Body() createBook: CreateBookModel) {
    const getBook = await this.booksService.createBook(createBook);

    return { getBook };
  }

  @Get()
  @ApiOperation({ title: 'Search all books'})
  public async getAllBooks() {
    const books = await this.booksService.getBooks();

    return books;
  }

  @Get(':id')
  @ApiOperation({ title: 'Search books by id'})
  public async getBook(@Param('id') bookId: string) {
    const result = await this.booksService.getBookById(bookId);

    return { result };
  }

  @Put()
  @ApiOperation({ title: 'Update book by id'})
  public async updateBook(
    @Body() updateBook: UpdateBookModel) {
    await this.booksService.updateBook(updateBook);

    return true;
  }

  @Delete(':id')
  @ApiOperation({ title: 'Delete book by id'})
  public async removeBook(@Param('id') bookId: string) {
    await this.booksService.deleteBook(bookId);

    return true;
  }
}
