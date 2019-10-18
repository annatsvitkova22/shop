import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository, DeleteResult } from 'typeorm';

import { AuthorInBooks } from 'src/entity';
import { UpdateAuthorInBooksModel, CreateAuthorInBooksModel } from 'src/models';

@Injectable()
export class AuthorInBookService {

    constructor( @InjectRepository(AuthorInBooks) private authorInBooksRepository: Repository<AuthorInBooks>) { }

    public async getAuthorInBooks(): Promise<AuthorInBooks[]> {
        const getAuthorInBooks: AuthorInBooks[] = await this.authorInBooksRepository.find();

        return getAuthorInBooks;
    }

    public async getAuthorInBooksById(id: number): Promise<AuthorInBooks[]> {
        const AuthorInBookId: UpdateAuthorInBooksModel = {};
        AuthorInBookId.id = id;
        const authorInBook: AuthorInBooks[] = await this.authorInBooksRepository.find({
            select: ['authorId', 'bookId'],
            where: [{ id: AuthorInBookId.id }],
        });

        return authorInBook;
    }

    public async createAuthorInBook(authorInBook: CreateAuthorInBooksModel): Promise<number> {
        const createdAuthorInBook: AuthorInBooks = {};
        createdAuthorInBook.authorId = authorInBook.authorId;
        createdAuthorInBook.bookId = authorInBook.bookId;

        const savedAuthorInBook: AuthorInBooks = await this.authorInBooksRepository.save(createdAuthorInBook);

        return(savedAuthorInBook.id);
    }

    public async updateAuthorInBook(authorInBook: UpdateAuthorInBooksModel): Promise<AuthorInBooks> {
        const updateAuthorInBook: AuthorInBooks = {};
        updateAuthorInBook.id = authorInBook.id;
        updateAuthorInBook.authorId = authorInBook.authorId;
        updateAuthorInBook.bookId = authorInBook.bookId;

        const toUpdate: AuthorInBooks = await this.authorInBooksRepository.findOne(updateAuthorInBook.id);

        toUpdate.authorId = updateAuthorInBook.authorId;
        toUpdate.bookId = updateAuthorInBook.bookId;

        const savedAuthorInBook: AuthorInBooks = await this.authorInBooksRepository.save(toUpdate);

        return savedAuthorInBook;
      }

      public async deleteAuthorInBook(authorInBookId: number): Promise<boolean|string> {
        const authorInBook: AuthorInBooks = {};
        authorInBook.id = authorInBookId;

        const result: Promise<DeleteResult> = this.authorInBooksRepository.delete(authorInBook);
        if (!result) {
            const messege: string = 'id not found';

            return messege;
        }

        return true;
    }
}
