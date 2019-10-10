import { Injectable } from '@nestjs/common';
import { Author } from 'src/entity';
import { UpdateAuthorModel, CreateAuthorModel } from 'src/models';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';

@Injectable()
export class AuthorService {

    constructor( @InjectRepository(Author) private authorRepository: Repository<Author>) { }

    public async getAuthors(): Promise<Author[]> {
        const gotAuthors = await this.authorRepository.find();
        return gotAuthors;
    }

    public async getAuthorById(id: number): Promise<Author[]> {
        const author: UpdateAuthorModel = {};
        author.id = id;
        const foundAuthor = await this.authorRepository.find({
            select: ['name'],
            where: [{ id: author.id }],
        });
        return foundAuthor;
    }

    public async createAuthor(author: CreateAuthorModel): Promise<number> {
        const createAuthor: Author = {};
        createAuthor.name = author.name;
        const savedAuthor = await this.authorRepository.save(createAuthor);

        return(savedAuthor.id);
    }

    public async updateAuthor(author: UpdateAuthorModel): Promise<Author> {
        const updateAuthor: Author = {};
        updateAuthor.id = author.id;
        updateAuthor.name = author.name;

        const toUpdate = await this.authorRepository.findOne(updateAuthor.id);
        toUpdate.name = updateAuthor.name;

        const savedAuthor = await this.authorRepository.save(toUpdate);

        return savedAuthor;
      }

    public async deleteAuthor(authorId: number): Promise<DeleteResult> {
        const author: Author = {};
        author.id = authorId;
        const result = this.authorRepository.delete(author);

        return result;
    }
}
