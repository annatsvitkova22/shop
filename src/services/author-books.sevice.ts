import { Injectable, Inject, forwardRef } from '@nestjs/common';

import { AuthorInBooks } from 'src/entity';
import { UpdateAuthorInBooksModel, CreateAuthorInBooksModel } from 'src/models';
import { UuidHelper } from 'src/common';
import { AuthorInBookRepository } from 'src/repositories/author-book.repository';

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
        const authorInBookId = new UpdateAuthorInBooksModel();
        authorInBookId.id = id;
        const authorInBook: AuthorInBooks = await this.authorInBooksRepository.getAuthorInBookById(authorInBookId.id);

        return authorInBook;
    }

    public async createAuthorInBook(createdAuthorInBook: CreateAuthorInBooksModel): Promise<string> {
        const authorInBook = new AuthorInBooks();
        authorInBook.authorId = createdAuthorInBook.authorId;
        authorInBook.bookId = createdAuthorInBook.bookId;
        authorInBook.id = this.uuidHelper.uuidv4();
        const savedAuthorInBook: AuthorInBooks = await this.authorInBooksRepository.createAuthorInBook(authorInBook);

        return(savedAuthorInBook.id);
    }

    public async updateAuthorInBook(authorInBook: UpdateAuthorInBooksModel): Promise<AuthorInBooks> {
        const updateAuthorInBook = new AuthorInBooks();
        updateAuthorInBook.id = authorInBook.id;
        updateAuthorInBook.authorId = authorInBook.authorId;
        updateAuthorInBook.bookId = authorInBook.bookId;

        const toUpdate: AuthorInBooks = await this.authorInBooksRepository.getAuthorInBookById(updateAuthorInBook.id);
        toUpdate.authorId = updateAuthorInBook.authorId;
        toUpdate.bookId = updateAuthorInBook.bookId;

        const savedAuthorInBook: AuthorInBooks = await this.authorInBooksRepository.createAuthorInBook(toUpdate);

        return savedAuthorInBook;
      }

      public async deleteAuthorInBook(authorInBookId: string): Promise<number> {
        const result: number = await this.authorInBooksRepository.deleteAuthorInBook(authorInBookId);

        return result;
    }
}
