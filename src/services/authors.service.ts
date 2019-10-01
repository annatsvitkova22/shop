import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Author } from 'src/models/authors.model'

@Injectable()
export class AuthorsService {
    constructor(
        @InjectModel ('Author') private authorModel: Model<Author>,
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
        return {
            id: author.id, 
            name: author.name,
        };
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
        if (result.n === 0) {
          throw new NotFoundException('Could not find author.');
        }
      }

    private async findAuthor(id: string): Promise<Author> {
        let author;
        try {
          author = await this.authorModel.findById(id).exec();
        } catch (error) {
          throw new NotFoundException('Could not find author.');
        }
        if (!author) {
          throw new NotFoundException('Could not find author.');
        }
        return author;
      }

}