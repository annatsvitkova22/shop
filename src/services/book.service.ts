import { Injectable } from '@nestjs/common';

import { BookDocument, AuthorDocument } from 'src/document';
import { CreateBookModel, UpdateBookModel, BookAuthorResultModel } from 'src/models';
import { BookRepository } from 'src/repositories';

const fs = require('fs');

@Injectable()
export class BooksService {
    constructor(public readonly bookRepository: BookRepository) { }

    public async createBook(book: CreateBookModel, file): Promise<BookDocument> {
        const createBook: BookDocument = {} as BookDocument;
        createBook.name = book.name;
        createBook.description = book.description;
        createBook.price = book.price;
        createBook.status = book.status;
        createBook.currency = book.currency;
        createBook.type = book.type;
        createBook.author = book.author;
        const bitmap = fs.readFileSync(file.path);
        createBook.image = bitmap.toString('base64');

        const author: BookDocument = await this.getAuthorById(createBook.author);

        if (!author) {
            createBook.author = null;
        }

        const savedBook: BookDocument = await this.bookRepository.createBook(createBook);

        return savedBook;
    }

    public async getBooks(): Promise<UpdateBookModel[]> {
        const books = await this.bookRepository.getBook();
        const result: UpdateBookModel[] = books.map(book => ({
            id: book.id,
            name: book.name,
            description: book.description,
            price: book.price,
            status: book.status,
            currency: book.currency,
            type: book.type,
            author: book.author,
        }));

        return result;
    }

    public async getBookById(bookId: string): Promise<BookAuthorResultModel> {
        const book: BookDocument = await this.findBook(bookId);
        const authorId = book.author;
        const author: BookDocument = await this.getAuthorById(authorId);
        const allResult: BookAuthorResultModel = {
            book,
            author,
        };

        return allResult;
    }

    public async getBookByAuthor(authorId: string): Promise<BookDocument> {
        const bookByAuthor: BookDocument = await this.findBookByAuthor(authorId);

        return bookByAuthor;
    }

    public async updateBook(book: UpdateBookModel): Promise<BookDocument> {

        const updateBook: BookDocument = {} as BookDocument;
        updateBook.id = book.id;
        updateBook.name = book.name;
        updateBook.description = book.description;
        updateBook.price = book.price;
        updateBook.status = book.status;
        updateBook.currency = book.currency;
        updateBook.type = book.type;
        updateBook.author = book.author;

        const author: AuthorDocument = await this.getAuthorById(updateBook.author);
        if (!author) {
            updateBook.author = null;
        }

        const updatedBook: BookDocument = await this.findBook(updateBook.id);
        if (updateBook.name) {
            updatedBook.name = updateBook.name;
        }
        if (updateBook.description) {
            updatedBook.description = updateBook.description;
        }
        if (updateBook.price) {
            updatedBook.price = updateBook.price;
        }
        if (updateBook.status) {
            updatedBook.status = updateBook.status;
        }
        if (updateBook.currency) {
            updatedBook.currency = updateBook.currency;
        }
        if (updateBook.type) {
            updatedBook.type = updateBook.type;
        }
        if (updateBook.author) {
            updatedBook.author = updateBook.author;
        }
        if (!author) {
            updatedBook.author = null;
        }

        const newBook: BookDocument = await this.bookRepository.updateBook(updatedBook);

        return newBook;
    }

    public async deleteBook(bookId: string): Promise<number> {
        const book: BookDocument = {} as BookDocument;
        book.id = bookId;
        const result = await this.bookRepository.deleteBook(book);

        return result.n;
    }

    private async findBook(id: string): Promise<BookDocument> {
        const book: BookDocument = {} as BookDocument;
        book.id = id;
        const foundBook: BookDocument = await this.bookRepository.findBook(book);

        return foundBook;
    }

    private async findBookByAuthor(authorId: string): Promise<BookDocument> {
        const foundBookByAuthor: BookDocument = await this.bookRepository.findBookByAuthor(authorId);

        return foundBookByAuthor;
    }

    public async getAuthorById(authorId: string): Promise<BookDocument> {
        const authorById: BookDocument = await this.findAuthor(authorId);

        return authorById;
    }

    private async findAuthor(id: string): Promise<BookDocument> {
        const foundAuthor: BookDocument = await this.bookRepository.findAuthor(id);

        return foundAuthor;
    }

}
