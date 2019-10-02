import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Author } from 'src/document/authors.model';
import { Book } from 'src/document/books.model'
import { BooksService } from 'src/services/books.service';

@Injectable()
export class AuthorsService {
    constructor(
        @InjectModel ('Author') private authorModel: Model<Author>,
        @InjectModel ('Book') private bookModel: Model<Book>,
    ){}

    async insertAuthor(name: string ){
        const newAuthor = new this.authorModel({
            name,
        });
        const result = await newAuthor.save();
        return result.id as string;
    }

    async getAuthors(){
        const authors = await this.authorModel.find().exec();
        return authors.map(authors => ({
            id: authors.id,
            name: authors.name,
        }));
    }

    async getSingleAuthor(authorId: string) {
        const author = await this.findAuthor(authorId);
    
        return author;
    }

    async updateAuthor(
        authorId: string,
        name: string,
      ) {
        const updatedAuthor = await this.findAuthor(authorId);
        if (name) {
            updatedAuthor.name = name;
        }
        updatedAuthor.save();
      }
    
      async deleteAuthor(authorId: string) {
        const result = await this.authorModel.deleteOne({_id: authorId}).exec();
        await this.getBookByAuthor(authorId);
        if (result.n === 0) {
          throw new NotFoundException('Could not find author.');
        }
      }

    private async findAuthor(id: string): Promise<Author> {
        let author;
          author = await this.authorModel.findById(id);
      
        return author;
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

      private async findBookByAuthor(authorId: string) {
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

}