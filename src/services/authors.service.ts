import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository, DeleteResult } from 'typeorm';

import { Author } from 'src/entity';
import { UpdateAuthorModel, CreateAuthorModel } from 'src/models';

@Injectable()
export class AuthorService {

    constructor( @InjectRepository(Author) private authorRepository: Repository<Author>) { }

    public async getAuthors(): Promise<Author[]> {
        const gotAuthors: Author[] = await this.authorRepository.find();
        return gotAuthors;
    }

    public async getAuthorById(id: string): Promise<Author[]> {
        const author: UpdateAuthorModel = {};
        author.id = id;
        const foundAuthor: Author[] = await this.authorRepository.find({
            select: ['name'],
            where: [{ id: author.id }],
        });
        return foundAuthor;
    }

    public async createAuthor(author: CreateAuthorModel): Promise<string> {
        const createAuthor: Author = {};
        const validateName = await this.validateName(author.name);
        createAuthor.name = validateName;
        const savedAuthor: Author = await this.authorRepository.save(createAuthor);

        return(savedAuthor.id);
    }

    public async updateAuthor(author: UpdateAuthorModel): Promise<Author> {
        const updateAuthor: Author = {};
        updateAuthor.id = author.id;
        updateAuthor.name = author.name;

        const toUpdate: Author = await this.authorRepository.findOne(updateAuthor.id);
        toUpdate.name = updateAuthor.name;

        const savedAuthor: Author = await this.authorRepository.save(toUpdate);

        return savedAuthor;
      }

    public async deleteAuthor(authorId: string): Promise<boolean|string> {
        const author: Author = {};
        author.id = authorId;
        const result: DeleteResult = await this.authorRepository.delete(author);
        if (result.affected === 0) {
            const messege: string = 'id not found';

            return messege;
        }

        return true;
    }

    public validateName(name: string): string {
        let validateName: string = name.replace(/\s+/g,' ').trim();
        validateName = validateName[0].toUpperCase() + validateName.substring(1, validateName.length).toLowerCase();

        return validateName;
    }
}
