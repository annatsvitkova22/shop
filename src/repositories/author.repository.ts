import { Injectable } from '@nestjs/common';
import { AuthorDocument } from 'src/document/authors.model';
import { InjectModel } from '@nestjs/mongoose';
import { BookDocument } from 'src/document/books.model';
import { Model } from 'mongoose';

@Injectable()
export class AuthorRepository {
    constructor(
        @InjectModel('Book') public bookModel: Model<BookDocument>,
        @InjectModel('Author') public authorModel: Model<AuthorDocument>,
    ) { }

    public async createAuthor(createAuthor: AuthorDocument) {
        const newAuthor = new this.authorModel(
            createAuthor,
        );
        const result = await newAuthor.save();

        return result;
    }

    public async getAuthors() {
        const authors = await this.authorModel.find().exec();

        return authors;
    }

    public async updateAuthor(updatedAuthor: AuthorDocument) {
        updatedAuthor.save();
    }

    public async deleteAuthor(idAuthor: AuthorDocument) {
        const result = await this.authorModel.deleteOne({ _id: idAuthor.id }).exec();

        return result;
    }

    public async findAuthor(idAuthor: AuthorDocument) {
        const author = await this.authorModel.findById(idAuthor.id);

        return author;
    }

    public async findBookByAuthor(idAuthor: AuthorDocument) {
        const book = await this.bookModel.findOneAndUpdate({ author: idAuthor.id }, { $set: { author: null } });

        return book;
    }
}
