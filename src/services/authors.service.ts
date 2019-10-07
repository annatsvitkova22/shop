import { Injectable } from '@nestjs/common';
import { Author } from 'src/entity';
import { AuthorRepository } from 'src/repositories/';
import { UpdateAuthorModel, CreateAuthorModel } from 'src/models';

@Injectable()
export class AuthorService {

    constructor( private authorRepository: AuthorRepository) { }

    async getAuthors(): Promise<Author[]> {
        const getAuthors = await this.authorRepository.getAuthors();
        return getAuthors;
    }

    async getAuthorById(id: number) {
        const AuthorId: UpdateAuthorModel = {};
        AuthorId.id = id;
        const author = await this.authorRepository.getAuthorsById(AuthorId);
        return author;
    }

    async createAuthor(createAuthor: CreateAuthorModel) {
        const getAuthor: Author = {} as Author;
        getAuthor.name = createAuthor.name;
        const author = await this.authorRepository.createAuthor(getAuthor);
        return(author.id);
    }

    async updateAuthor(updateAuthor: UpdateAuthorModel): Promise<Author> {
        const getAuthor: Author = {} as Author;
        getAuthor.id = updateAuthor.id;
        getAuthor.name = updateAuthor.name;
        const toUpdate = await this.authorRepository.getAuthorById(getAuthor);
        delete toUpdate.name;
        delete getAuthor.id;
        const updated = Object.assign(toUpdate, getAuthor);
        const author = await this.authorRepository.createAuthor(updated);
        return author;
      }

    async deleteAuthor(authorId: number) {
        const author: Author = {} as Author;
        author.id = authorId;
        const result = this.authorRepository.deleteAuthor(author);
        return result;
    }
}
