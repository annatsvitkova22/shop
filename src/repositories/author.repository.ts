import { Injectable } from '@nestjs/common';
import { Author } from 'src/entity';

const db = require('src/entity/author.entity');

@Injectable()
export class AuthorRepository {

    public async getAuthors(): Promise<Author[]> {
        const getAuthors: Author[] = await db.Author.findAll();

        return getAuthors;
    }

    public async getAuthorIById(authorId: string): Promise<Author> {
        const author: Author = await db.Author.findOne({
            where: { id: authorId },
        });

        return author;
    }

    public async createAuthor(createAuthor: Author): Promise<Author> {
        const author: Author = await createAuthor.save();

        return author;
    }

    public async deleteAuthor(authorId: string): Promise<number> {
        const deleted: number = await db.Author.destroy({
            where: { id: authorId },
        });

        return deleted;
    }
}