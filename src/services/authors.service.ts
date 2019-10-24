import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository, DeleteResult } from 'typeorm';

import { Author } from 'src/entity';
import { UpdateAuthorModel, CreateAuthorModel } from 'src/models';

@Injectable()
export class AuthorService {

    constructor(
        @Inject('AuthorRepository') private readonly authorRepository: typeof Author,
       ) { }

    public async getAuthors(): Promise<Author[]> {
        const gotAuthors: Author[] = await this.authorRepository.findAll<Author>();

        return gotAuthors;
    }

    // public async getAuthorById(id: string): Promise<Author> {
    //     const author = new UpdateAuthorModel();
    //     author.id = id;
    //     const foundAuthor: Author = await this.authorRepository.findOne<Author>(author.id)

    //     return foundAuthor;
    // }

    public async createAuthor(CreateAuthor: CreateAuthorModel): Promise<string> {
        const author = new Author();
        const validateName = await this.validateName(CreateAuthor.name);
        author.name = validateName;

        const savedAuthor: Author = await this.authorRepository.create<Author>(author);

        return(savedAuthor.id);
    }

    // public async updateAuthor(author: UpdateAuthorModel): Promise<Author> {
    //     const updateAuthor = new Author();
    //     updateAuthor.id = author.id;
    //     updateAuthor.name = author.name;

    //     const toUpdate: Author = await this.authorRepository.findOne(updateAuthor.id);
    //     toUpdate.name = updateAuthor.name;

    //     const savedAuthor: Author = await this.authorRepository.save(toUpdate);

    //     return savedAuthor;
    //   }

    public async deleteAuthor(authorId: string): Promise<number> {
        const result: number = await this.authorRepository.destroy({
            where: { id: authorId },
          });

        return result;
    }

    public validateName(name: string): string {
        let validateName: string = name.replace(/\s+/g,' ').trim();
        validateName = validateName[0].toUpperCase() + validateName.substring(1, validateName.length).toLowerCase();

        return validateName;
    }

    // private _assign(author: CreateAuthorModel, newValue: CreateAuthorModel): Author {
    //     for (const key of Object.keys(author)) {
    //         if (author[key] !== newValue[key]) author[key] = newValue[key];
    //     }

    //     return author as Author;
    // }
}
