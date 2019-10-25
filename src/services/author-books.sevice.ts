import { Injectable, Inject, forwardRef } from '@nestjs/common';

import { AuthorInBooks } from 'src/entity';
import { UpdateAuthorInBooksModel, CreateAuthorInBooksModel } from 'src/models';
import { UuidHelper } from 'src/common';

@Injectable()
export class AuthorInBookService {

    constructor(
        @Inject('AuthorInBooksRepository') private readonly authorInBooksRepository: typeof AuthorInBooks,
        @Inject(forwardRef(() => UuidHelper)) public uuidHelper: UuidHelper,
        ) { }

    public async getAuthorInBooks(): Promise<AuthorInBooks[]> {
        const getAuthorInBooks: AuthorInBooks[] = await this.authorInBooksRepository.findAll<AuthorInBooks>();

        return getAuthorInBooks;
    }

    public async getAuthorInBooksById(id: string): Promise<AuthorInBooks> {
        const AuthorInBookId = new UpdateAuthorInBooksModel();
        AuthorInBookId.id = id;
        const authorInBook: AuthorInBooks = await this.authorInBooksRepository.findOne({
            where: {id: AuthorInBookId.id},
          });

        return authorInBook;
    }

    public async createAuthorInBook(createdAuthorInBook: CreateAuthorInBooksModel): Promise<string> {
        const authorInBook = new AuthorInBooks();
        authorInBook.authorId = createdAuthorInBook.authorId;
        authorInBook.bookId = createdAuthorInBook.bookId;
        authorInBook.id = this.uuidHelper.uuidv4();
        const savedAuthorInBook: AuthorInBooks = await authorInBook.save();

        return(savedAuthorInBook.id);
    }

    public async updateAuthorInBook(authorInBook: UpdateAuthorInBooksModel): Promise<AuthorInBooks> {
        const updateAuthorInBook = new AuthorInBooks();
        updateAuthorInBook.id = authorInBook.id;
        updateAuthorInBook.authorId = authorInBook.authorId;
        updateAuthorInBook.bookId = authorInBook.bookId;

        const toUpdate: AuthorInBooks = await this.getAuthorInBooksById(updateAuthorInBook.id);
        toUpdate.authorId = updateAuthorInBook.authorId;
        toUpdate.bookId = updateAuthorInBook.bookId;

        const savedAuthorInBook: AuthorInBooks = await toUpdate.save();

        return savedAuthorInBook;
      }

      public async deleteAuthorInBook(authorInBookId: string): Promise<number> {
        const result: number = await this.authorInBooksRepository.destroy({
            where: { id: authorInBookId },
          });

        return result;
    }
}
