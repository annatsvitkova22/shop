import { Injectable, NotFoundException } from '@nestjs/common';
import { BookDocument } from 'src/document/books.model';
import { CreateBookModel, UpdateBookModel } from 'src/models';
import { BookRepository } from 'src/repositories/book.repository';

@Injectable()
export class BooksService {
    constructor(
        public readonly bookRepository: BookRepository,
    ) { }

    public async createBook(createBook: CreateBookModel) {
        const getBook: BookDocument = {} as BookDocument;
        getBook.name = createBook.name;
        getBook.description = createBook.description;
        getBook.price = createBook.price;
        getBook.status = createBook.status;
        getBook.currency = createBook.currency;
        getBook.type = createBook.type;
        getBook.author = createBook.author;

        const author = await this.getAuthorById(getBook.author);
        if (!author) {
            getBook.author = null;
        }
        const savedBook = await this.bookRepository.createBook(getBook);
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
        const result = {
            id: book.id,
            name: book.name,
            description: book.description,
            price: book.price,
            status: book.status,
            currency: book.currency,
            type: book.type,
            author: book.author,
        };
        const allResult = {
            result,
            author,
        };
        return allResult;
    }

    public async getBookByAuthor(authorId: string) {
        const book = await this.findBookByAuthor(authorId);
        const result = {
            id: book.id,
            name: book.name,
            description: book.description,
            price: book.price,
            status: book.status,
            currency: book.currency,
            type: book.type,
            author: book.author,
        };

        return result;
    }

    public async updateBook(updateBook: UpdateBookModel) {

        const updateBookDoc: BookDocument = {} as BookDocument;
        updateBookDoc.id = updateBook.id;
        updateBookDoc.name = updateBook.name;
        updateBookDoc.description = updateBook.description;
        updateBookDoc.price = updateBook.price;
        updateBookDoc.status = updateBook.status;
        updateBookDoc.currency = updateBook.currency;
        updateBookDoc.type = updateBook.type;
        updateBookDoc.author = updateBook.author;

        const author = await this.getAuthorById(updateBookDoc.author);
        if (!author) {
            updateBookDoc.author = null;

        }
        const updatedBook = await this.findBook(updateBookDoc.id);
        if (updateBookDoc.name) {
            updatedBook.name = updateBookDoc.name;
        }
        if (updateBookDoc.description) {
            updatedBook.description = updateBookDoc.description;
        }
        if (updateBookDoc.price) {
            updatedBook.price = updateBookDoc.price;
        }
        if (updateBookDoc.status) {
            updatedBook.status = updateBookDoc.status;
        }
        if (updateBookDoc.currency) {
            updatedBook.currency = updateBookDoc.currency;
        }
        if (updateBookDoc.type) {
            updatedBook.type = updateBookDoc.type;
        }
        if (updateBookDoc.author) {
            updatedBook.author = updateBookDoc.author;
        }
        if (!author) {
            updatedBook.author = null;
        }

        await this.bookRepository.updateBook(updatedBook);
    }

    public async deleteBook(bookId: string) {
        const book: BookDocument = {} as BookDocument;
        book.id = bookId;
        const result = await this.bookRepository.deleteBook(book);
        if (result.n === 0) {
            throw new NotFoundException('Could not find book.');
        }
    }

    private async findBook(id: string): Promise<BookDocument> {
        const idBook: BookDocument = {} as BookDocument;
        idBook.id = id;
        let book;
        try {
            book = await this.bookRepository.findBook(idBook);
        } catch (error) {
            throw new NotFoundException('Could not find book.');
        }
        if (!book) {
            throw new NotFoundException('Could not find book.');
        }
        return book;
    }

    private async findBookByAuthor(authorId: string): Promise<BookDocument> {
        let book;
        try {
            book = await this.bookRepository.findBookByAuthor(authorId);
        } catch (error) {
            throw new NotFoundException('Could not find book.');
        }
        if (!book) {
            throw new NotFoundException('Could not find book.');
        }
        return book;
    }

    async getAuthorById(authorId: string) {
        const author = await this.findAuthor(authorId);
        return author;
    }

    private async findAuthor(id: string) {
        const author = await this.bookRepository.findAuthor(id);
        return author;
    }
}
