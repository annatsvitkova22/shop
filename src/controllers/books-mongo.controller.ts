import { Controller, Post, Body, Get, Param, Put, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ApiUseTags, ApiOperation } from '@nestjs/swagger';

import { BooksService } from 'src/services/book.service';
import { CreateBookModel, UpdateBookModel } from 'src/models';
import { BookDocument } from 'src/document';
import { FileInterceptor, AnyFilesInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { diskStorage } from 'multer';

const fs = require('fs');

export const editFileName = (req, file, callback) => {
  const name = file.originalname.split('.')[0];
  const fileExtName = extname(file.originalname);
  const randomName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  callback(null, `${name}-${randomName}${fileExtName}`);
};

@ApiUseTags('Book in Mongo')
@Controller('books')
export class BooksController {
  filesService: any;
  constructor(private readonly booksService: BooksService) { }

  @Get()
  @ApiOperation({ title: 'Search all books' })
  public async getAllBooks(): Promise<UpdateBookModel[]> {
    const books: UpdateBookModel[] = await this.booksService.getBooks();

    return books;
  }

  @Get(':id')
  @ApiOperation({ title: 'Search books by id' })
  public async getBook(@Param('id') bookId: string) {
    const result = await this.booksService.getBookById(bookId);

    return { result };
  }

  // @Post()
  // @ApiOperation({ title: 'Create book' })
  // public async createBook(@Body() createBook: CreateBookModel): Promise<BookDocument> {
  //   const getBook: BookDocument = await this.booksService.createBook(createBook);

  //   return getBook;
  // }

  @Post('file')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './image',
        filename: editFileName,
      }),
    }),
  )
  public async uploadedFile(@UploadedFile() file, @Body() createBook: CreateBookModel): Promise<BookDocument> {
    console.log(createBook.name);
    const response = {
      originalname: file.originalname,
      filename: file.filename,
    };
    const getBook: BookDocument = await this.booksService.createBook(createBook, file);
    console.log(file);
    return getBook;
  }

  @Put()
  @ApiOperation({ title: 'Update book by id' })
  public async updateBook(
    @Body() updateBook: UpdateBookModel): Promise<BookDocument> {
    const book: BookDocument = await this.booksService.updateBook(updateBook);

    return book;
  }

  @Delete(':id')
  @ApiOperation({ title: 'Delete book by id' })
  public async removeBook(@Param('id') bookId: string): Promise<boolean> {
    await this.booksService.deleteBook(bookId);

    return true;
  }
}
