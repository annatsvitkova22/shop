import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BookDocument } from 'src/document/books.model';
import { Model } from 'mongoose';
import { AuthorDocument } from 'src/document/authors.model';

@Injectable()
export class BookRepository {
    constructor(
        @InjectModel('Book') public bookModel: Model<BookDocument>,
        @InjectModel('Author') public authorModel: Model<AuthorDocument>,
    ) {}
    public async createBook(createBook: BookDocument): Promise<BookDocument> {

        const newBook = new this.bookModel(
            createBook,
        );
        const result = await newBook.save();

        return result;
    }

    public async getBook(): Promise<BookDocument[]> {
        const books = await this.bookModel.find().exec();

        return books;
    }

    public async updateBook(updateBook: BookDocument): Promise<BookDocument> {
        const result = updateBook.save();

        return result;
    }

    public async deleteBook(book: BookDocument) {
        const result = await this.bookModel.deleteOne({ _id: book.id }).exec();

        return result;
    }

    public async findBook(idBook: BookDocument): Promise<BookDocument> {
        const book = await this.bookModel.findById(idBook.id).exec();

        return book;
    }

    public async findBookByAuthor(authorId: string): Promise<BookDocument> {
        const book = await this.bookModel.findOneAndUpdate({author: authorId}, {$set: {author: null}});

        return book;
    }

    public async findAuthor(id: string): Promise<BookDocument> {
       const author = await this.authorModel.findById(id);

       return author;
    }
}
