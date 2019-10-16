import { Injectable } from '@nestjs/common';
import { AuthorDocument } from 'src/document/authors.model';
import { InjectModel } from '@nestjs/mongoose';
import { BookDocument } from 'src/document/books.model';
import { Model } from 'mongoose';

@Injectable()
export class AuthorMongoRepository {
    constructor(
        @InjectModel('Book') public bookModel: Model<BookDocument>,
        @InjectModel('Author') public authorModel: Model<AuthorDocument>,
    ) { }

    public async createAuthor(createAuthor: AuthorDocument): Promise<AuthorDocument> {
        const newAuthor: AuthorDocument = new this.authorModel(
            createAuthor,
        );
        const result = await newAuthor.save();

        return result;
    }

    public async getAuthors(): Promise<AuthorDocument[]>  {
        const authors: AuthorDocument[] = await this.authorModel.find().exec();

        return authors;
    }

    public async updateAuthor(updatedAuthor: AuthorDocument): Promise<AuthorDocument>  {
        const result: Promise<AuthorDocument> = updatedAuthor.save();

        return result;
    }

    public async deleteAuthor(idAuthor: AuthorDocument) {
        const result = await this.authorModel.deleteOne({ _id: idAuthor.id }).exec();

        return result;
    }

    public async findAuthorById(idAuthor: AuthorDocument): Promise<AuthorDocument>  {
        const author: AuthorDocument = await this.authorModel.findById(idAuthor.id);

        return author;
    }

    public async findBookByAuthor(idAuthor: AuthorDocument): Promise<AuthorDocument> {
        const book: AuthorDocument = await this.bookModel.findOneAndUpdate({ author: idAuthor.id }, { $set: { author: null } });

        return book;
    }
}
