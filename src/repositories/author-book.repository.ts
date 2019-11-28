import { Injectable } from '@nestjs/common';
import sequelize = require('sequelize');

import { AuthorInBooks } from 'src/entity';

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

    public async createAuthorInBook(createAuthorInBook: AuthorInBooks): Promise<AuthorInBooks> {
        const authorInBook: AuthorInBooks = await createAuthorInBook.save();

        return authorInBook;
    }

    public async ccreateAuthorInBook(query: string): Promise<AuthorInBooks[]> {
        try {
            const authorInBook: AuthorInBooks[] = await db.AuthorInBooks.sequelize.query(query, {
                plain: false,
                raw: false,
                type: sequelize.QueryTypes.SELECT,
            });
            return authorInBook;
        }
        catch (e) {
            // инструкции для работы с ошибками
            console.log(e); // передает объект ошибки для управления им
        }
    }

    public async deleteAuthorInBook(authorInBookId: string): Promise<number> {
        const deleted: number = await db.AuthorInBooks.destroy({
            where: { id: authorInBookId },
        });

        return deleted;
    }
}
