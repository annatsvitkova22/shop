import { Injectable } from '@nestjs/common';
import { Author } from 'src/entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthorRepository {
    constructor(@InjectRepository(Author) private authorRepository: Repository<Author>) { }

    public async createAuthor(createAuthor: Author) {
        const author = await this.authorRepository.save(createAuthor);
        return author;
    }

    public async getAuthors() {
        const getAuthors = await this.authorRepository.find();
        return getAuthors;
    }

    public async getAuthorsById(authorId: Author) {
        const findAuthor = await this.authorRepository.find({
            select: ['name'],
            where: [{ id: authorId.id }],
        });
        return findAuthor;
    }

    public async getAuthorById(getAuthor: Author) {
        const findAuthor = await this.authorRepository.findOne(getAuthor.id);
        return findAuthor;
    }

    public async deleteAuthor(author: Author) {
        const result = this.authorRepository.delete(author);
        return result;
    }
}
