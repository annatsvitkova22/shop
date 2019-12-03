import { Injectable } from '@nestjs/common';
import sequelize = require('sequelize');

import { AuthorInBooks, Author } from 'src/entity';

import db = require('src/entity/author-book.entity');

@Injectable()
export class AuthorInBookRepository {

    public async getAuthorInBooks(): Promise<AuthorInBooks[]> {
        const getAuthorInBooks: AuthorInBooks[] = await db.AuthorInBooks.findAll();

        return getAuthorInBooks;
    }

    public async getAuthorInBookById(authorInBookId: string): Promise<AuthorInBooks> {
        const authorInBook: AuthorInBooks = await db.AuthorInBooks.findOne({
            where: { id: authorInBookId },
        });

        return authorInBook;
    }

    public async createAuthorInBook(query: string): Promise<any> {
        const authorInBook: any = await db.AuthorInBooks.sequelize.query(query, {
            plain: false,
            raw: false,
            type: sequelize.QueryTypes.SELECT,
        });

        return authorInBook;
    }

    public async deleteAuthorInBook(bookId: string): Promise<number> {
        const deleted: number = await db.AuthorInBooks.destroy({
            where: { bookId },
        });

        return deleted;
    }
}
