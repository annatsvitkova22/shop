import { Controller, Post, Body, Get, Param, Patch, Delete, NotFoundException} from '@nestjs/common';
import { BooksService } from 'src/services/books.service';
import { CreateBookModel, UpdateBookModel } from 'src/models';
  
  @Controller('books')
  export class BooksController {
    constructor(
        private readonly booksService: BooksService,
        ) {}
  
    @Post()
    async createBook(@Body() createBook: CreateBookModel){
      const getId = await this.booksService.createBook(createBook);

      return { getId };
    }
  
    @Get()
    async getAllBooks() {
      const books = await this.booksService.getBooks();
      return books;
    }
  
    @Get(':id')
    async getBook(@Param('id') bookId: string) {
        const result =  await this.booksService.getSingleBook(bookId);
        
        return {result};
    }
  
    @Patch()
    async updateBook(
      @Body() book: UpdateBookModel){
        await this.booksService.updateBook(book);

        return "Ok";
    }
  
    @Delete(':id')
    async removeBook(@Param('id') bookId: string) {
        await this.booksService.deleteBook(bookId);
        return "OK";
    }
  }