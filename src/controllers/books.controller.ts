import { Controller, Post, Body, Get, Param, Patch, Delete, NotFoundException} from '@nestjs/common';
import { BooksService } from 'src/services/books.service';
import { AuthorsService } from 'src/services/authors.service';
  
  @Controller('books')
  export class BooksController {
    constructor(
        private readonly booksService: BooksService,
        private readonly authorsService: AuthorsService,
        ) {}
  
    @Post()
    async addBook(
      @Body('name') bookName: string,
      @Body('description') bookDescription: string,
      @Body('price') bookPrice: number,
      @Body('status') bookStatus: string,
      @Body('currency') bookCurrency: string,
      @Body('type') bookType: string,
      @Body('author') bookAuthor: string,
    ) {
        const author = await this.authorsService.getSingleAuthor(bookAuthor);
        if(!author){
            throw new NotFoundException('Could not find author.');
        }
      const generatedId = await this.booksService.insertBook(
        bookName,
        bookDescription,
        bookPrice,
        bookStatus,
        bookCurrency,
        bookType,
        bookAuthor,
      );
      return { id: generatedId };
    }
  
    @Get()
    async getAllBooks() {
      const books = await this.booksService.getBooks();

      return books;
    }
  
    @Get(':id')
    async getBook(@Param('id') bookId: string) {
        const book =  await this.booksService.getSingleBook(bookId);
        const authorId = book.author;
        const author = await this.authorsService.getSingleAuthor(authorId);
        return {book, author};
    }
  
    @Patch(':id')
    async updateBook(
      @Param('id') bookId: string,
      @Body('name') bookName: string,
      @Body('description') bookDescription: string,
      @Body('price') bookPrice: number,
      @Body('status') bookStatus: string,
      @Body('currency') bookCurrency: string,
      @Body('type') bookType: string,
    ) {
      await this.booksService.updateBook(bookId, bookName, bookDescription, bookPrice, bookStatus, bookCurrency, bookType);
      return null;
    }
  
    @Delete(':id')
    async removeBook(@Param('id') bookId: string) {
        await this.booksService.deleteBook(bookId);
        return null;
    }
  }