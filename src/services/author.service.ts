import { Injectable } from '@nestjs/common';

import { Author } from 'src/entity';
import { UpdateAuthorModel, CreateAuthorModel } from 'src/models';
import { UuidHelper } from 'src/common/uuid.helper';
import { AuthorRepository } from 'src/repositories/author.repository';

@Injectable()
export class AuthorService {

    constructor(
        private readonly authorRepository: AuthorRepository,
        public uuidHelper: UuidHelper,
       ) { }

    public async getAuthors(): Promise<Author[]> {
        const gotAuthors: Author[] = await this.authorRepository.getAuthors();

        return gotAuthors;
    }

    public async getAuthorById(id: string): Promise<Author> {
        const foundAuthor: Author = await this.authorRepository.getAuthorIById(id);

        return foundAuthor;
    }

    public async createAuthor(CreateAuthor: CreateAuthorModel): Promise<Author> {
        const author: Author = new Author();
        const validateName = await this.validateName(CreateAuthor.name);
        author.name = validateName;
        author.id = this.uuidHelper.uuidv4();

        const savedAuthor: Author = await this.authorRepository.createAuthor(author);

        return savedAuthor;
    }

    public async updateAuthor(author: UpdateAuthorModel): Promise<Author> {
        const updateAuthor: Author = new Author();
        updateAuthor.id = author.id;
        updateAuthor.name = author.name;

        const validateName: string = await this.validateName(updateAuthor.name);
        const toUpdate: Author = await this.authorRepository.getAuthorIById(updateAuthor.id);
        toUpdate.name = validateName;

        const savedAuthor: Author = await this.authorRepository.createAuthor(toUpdate);

        return savedAuthor;
      }

    public async deleteAuthor(authorId: string): Promise<number> {
        const result: number = await this.authorRepository.deleteAuthor(authorId);

        return result;
    }

    public validateName(name: string): string {
        let validateName: string = name.replace(/\s+/g,' ').trim();
        validateName = validateName[0].toUpperCase() + validateName.substring(1, validateName.length).toLowerCase();

        return validateName;
    }
}
