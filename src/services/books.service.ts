import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book } from 'src/document/books.model'
import { CreateBookModel, UpdateBookModel } from 'src/models';
import { Author } from 'src/document/authors.model';


@Injectable()
export class BooksService {
    constructor(
        @InjectModel('Book') public bookModel: Model<Book>,
        @InjectModel('Author') public authorModel: Model<Author>,
    ) {}

    async createBook(createBook: CreateBookModel) {

        const author = await this.getSingleAuthor(createBook.author);
        if(!author){
            createBook.author = null;
        }
        const newBook = new this.bookModel(
            createBook
        );
       
        const result = await newBook.save();
    
        return result.id;
    }

    async getBooks() {
        const books = await this.bookModel.find().exec();
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

    async getSingleBook(bookId: string) {
        const book = await this.findBook(bookId);
        const authorId = book.author;
        const author = await this.getSingleAuthor(authorId);
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
        const all_result ={
            result,
            author
        }
        return all_result;
    }

    async getBookByAuthor(authorId: string) {
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

    async updateBook(book: UpdateBookModel) {
        const author = await this.getSingleAuthor(book.author);
        if(!author){
          book.author = null;

        }
        const updatedBook = await this.findBook(book.id);
        if (book.name) {
            updatedBook.name = book.name;
        }
        if (book.description) {
            updatedBook.description = book.description;
        }
        if (book.price) {
            updatedBook.price = book.price;
        }
        if (book.status) {
            updatedBook.status = book.status;
        }
        if (book.currency) {
            updatedBook.currency = book.currency;
        }
        if (book.type) {
            updatedBook.type = book.type;
        }
        if (book.author) {
            updatedBook.author = book.author;
        }
        if(!author){
            updatedBook.author = null;
        }
        updatedBook.save();
    }

    async deleteBook(bookId: string) {
        const result = await this.bookModel.deleteOne({ _id: bookId }).exec();
        if (result.n === 0) {
            throw new NotFoundException('Could not find book.');
        }
    }

    private async findBook(id: string): Promise<Book> {
        let book;
        try {
            book = await this.bookModel.findById(id).exec();
        } catch (error) {
            throw new NotFoundException('Could not find book.');
        }
        if (!book) {
            throw new NotFoundException('Could not find book.');
        }
        return book;
    }

    private async findBookByAuthor(authorId: string): Promise<Book> {
        let book;
        try {
            book = await this.bookModel.findOneAndUpdate({author: authorId}, {$set: {author: null}});
        } catch (error) {
            throw new NotFoundException('Could not find book.');
        }
        if (!book) {
            throw new NotFoundException('Could not find book.');
        }
        return book;
    }

    async getSingleAuthor(authorId: string) {
        const author = await this.findAuthor(authorId);
    
        return author;
    }

    private async findAuthor(id: string) {
        let author;
          author = await this.authorModel.findById(id);
            
        return author;
      }
}