import { Injectable, Inject, forwardRef } from '@nestjs/common';

import { AuthorInBooks } from 'src/entity';
import { UpdateAuthorInBooksModel, CreateAuthorInBooksModel } from 'src/models';
import { UuidHelper } from 'src/common';
import { AuthorInBookRepository } from 'src/repositories/';

@Injectable()
export class AuthorInBookService {

    constructor(
        private readonly authorInBooksRepository: AuthorInBookRepository,
        @Inject(forwardRef(() => UuidHelper)) public uuidHelper: UuidHelper,
    ) { }

    public async getAuthorInBooks(): Promise<AuthorInBooks[]> {
        const getAuthorInBooks: AuthorInBooks[] = await this.authorInBooksRepository.getAuthorInBooks();

        return getAuthorInBooks;
    }

    public async getAuthorInBooksById(id: string): Promise<AuthorInBooks> {
        const authorInBook: AuthorInBooks = await this.authorInBooksRepository.getAuthorInBookById(id);

        return authorInBook;
    }

    public async deleteAuthorInBook(authorInBookId: string): Promise<number> {
        const result: number = await this.authorInBooksRepository.deleteAuthorInBook(authorInBookId);

        return result;
    }
}
