import { Injectable, NotFoundException } from '@nestjs/common';

import { BookDocument } from 'src/document';
import { CreateBookModel, UpdateBookModel } from 'src/models';
import { BookRepository } from 'src/repositories';

@Injectable()
export class BooksService {
    constructor(
        public readonly bookRepository: BookRepository,
    ) { }

    public async createBook(book: CreateBookModel): Promise<BookDocument> {
        const createBook: BookDocument = {} as BookDocument;
        createBook.name = book.name;
        createBook.description = book.description;
        createBook.price = book.price;
        createBook.status = book.status;
        createBook.currency = book.currency;
        createBook.type = book.type;
        createBook.author = book.author;

        const author = await this.getAuthorById(createBook.author);
        if (!author) {
            createBook.author = null;
        }
        const savedBook = await this.bookRepository.createBook(createBook);
        return savedBook;
    }

    public async getBooks() {
        const books = await this.bookRepository.getBook();
        const result = books.map(book => ({
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

    public async getBookById(bookId: string) {
        const book = await this.findBook(bookId);
        const authorId = book.author;
        const author = await this.getAuthorById(authorId);
        const allResult = {
            book,
            author,
        };
        return allResult;
    }

    public async getBookByAuthor(authorId: string) {
        const bookByAuthor = await this.findBookByAuthor(authorId);

        return bookByAuthor;
    }

    public async updateBook(book: UpdateBookModel) {

        const updateBook: BookDocument = {} as BookDocument;
        updateBook.id = book.id;
        updateBook.name = book.name;
        updateBook.description = book.description;
        updateBook.price = book.price;
        updateBook.status = book.status;
        updateBook.currency = book.currency;
        updateBook.type = book.type;
        updateBook.author = book.author;

        const author = await this.getAuthorById(updateBook.author);
        if (!author) {
            updateBook.author = null;
        }

        const updatedBook = await this.findBook(updateBook.id);
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

        const newBook = await this.bookRepository.updateBook(updatedBook);

        return newBook;
    }

    public async deleteBook(bookId: string) {
        const book: BookDocument = {} as BookDocument;
        book.id = bookId;
        const result = await this.bookRepository.deleteBook(book);
        if (result.n === 0) {
            throw new NotFoundException('Could not find book.');
        }

        return result;
    }

    private async findBook(id: string): Promise<BookDocument> {
        const book: BookDocument = {} as BookDocument;
        book.id = id;
        let foundBook;
        try {
            foundBook = await this.bookRepository.findBook(book);
        } catch (error) {
            throw new NotFoundException('Could not find book.');
        }
        if (!foundBook) {
            throw new NotFoundException('Could not find book.');
        }

        return foundBook;
    }

    private async findBookByAuthor(authorId: string): Promise<BookDocument> {
        let foundBookByAuthor;
        try {
            foundBookByAuthor = await this.bookRepository.findBookByAuthor(authorId);
        } catch (error) {
            throw new NotFoundException('Could not find book.');
        }
        if (!foundBookByAuthor) {
            throw new NotFoundException('Could not find book.');
        }

        return foundBookByAuthor;
    }

    async getAuthorById(authorId: string): Promise<BookDocument> {
        const authorById = await this.findAuthor(authorId);

        return authorById;
    }

    private async findAuthor(id: string): Promise<BookDocument> {
        const foundAuthor = await this.bookRepository.findAuthor(id);

        return foundAuthor;
    }
}
