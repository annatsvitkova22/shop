import { Injectable, Inject } from '@nestjs/common';

import { AuthorInBooks } from 'src/entity';
import { UpdateAuthorInBooksModel, CreateAuthorInBooksModel } from 'src/models';

@Injectable()
export class AuthorInBookService {

    constructor(  @Inject('AuthorInBooksRepository') private readonly authorInBooksRepository: typeof AuthorInBooks) { }

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

    public async createAuthorInBook(authorInBook: CreateAuthorInBooksModel): Promise<string> {
        const createdAuthorInBook = new AuthorInBooks();
        createdAuthorInBook.authorId = authorInBook.authorId;
        createdAuthorInBook.bookId = authorInBook.bookId;

        const savedAuthorInBook: AuthorInBooks = await this.authorInBooksRepository.create<AuthorInBooks>(createdAuthorInBook);

        return(savedAuthorInBook.id);
    }

    // public async updateAuthorInBook(authorInBook: UpdateAuthorInBooksModel): Promise<AuthorInBooks> {
    //     const updateAuthorInBook: AuthorInBooks = {};
    //     updateAuthorInBook.id = authorInBook.id;
    //     updateAuthorInBook.authorId = authorInBook.authorId;
    //     updateAuthorInBook.bookId = authorInBook.bookId;

    //     const toUpdate: AuthorInBooks = await this.authorInBooksRepository.findOne(updateAuthorInBook.id);

    //     toUpdate.authorId = updateAuthorInBook.authorId;
    //     toUpdate.bookId = updateAuthorInBook.bookId;

    //     const savedAuthorInBook: AuthorInBooks = await this.authorInBooksRepository.save(toUpdate);

    //     return savedAuthorInBook;
    //   }

      public async deleteAuthorInBook(authorInBookId: string): Promise<number> {
        const result: number = await this.authorInBooksRepository.destroy({
            where: { id: authorInBookId },
          });

        return result;
    }
}
