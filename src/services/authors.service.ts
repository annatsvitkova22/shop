import { Injectable } from '@nestjs/common';
import { Author } from 'src/entity';
import { UpdateAuthorModel, CreateAuthorModel } from 'src/models';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthorService {

    constructor( @InjectRepository(Author) private authorRepository: Repository<Author>) { }

    async getAuthors(): Promise<Author[]> {
        const getAuthors = await this.authorRepository.find();
        return getAuthors;
    }

    async getAuthorById(id: number) {
        const AuthorId: UpdateAuthorModel = {};
        AuthorId.id = id;
        const author = await this.authorRepository.find({
            select: ['name'],
            where: [{ id: AuthorId.id }],
        });
        return author;
    }

    async createAuthor(createAuthor: CreateAuthorModel) {
        const getAuthor: Author = {} as Author;
        getAuthor.name = createAuthor.name;
        const author = await this.authorRepository.save(getAuthor);
        return(author.id);
    }

    async updateAuthor(updateAuthor: UpdateAuthorModel): Promise<Author> {
        const getAuthor: Author = {} as Author;
        getAuthor.id = updateAuthor.id;
        getAuthor.name = updateAuthor.name;
        const toUpdate = await this.authorRepository.findOne(getAuthor.id);
        delete toUpdate.name;
        delete getAuthor.id;
        const updated = Object.assign(toUpdate, getAuthor);
        const author = await this.authorRepository.save(updated);
        return author;
      }

    async deleteAuthor(authorId: number) {
        const author: Author = {} as Author;
        author.id = authorId;
        const result = this.authorRepository.delete(author);
        return result;
    }
}
