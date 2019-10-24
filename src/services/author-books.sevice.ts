import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository, DeleteResult } from 'typeorm';

import { AuthorInBooks } from 'src/entity';
import { UpdateAuthorInBooksModel, CreateAuthorInBooksModel } from 'src/models';

@Injectable()
export class AuthorInBookService {

    constructor(  @Inject('AuthorInBooksRepository') private readonly authorInBooksRepository: typeof AuthorInBooks) { }

    public async getAuthorInBooks(): Promise<AuthorInBooks[]> {
        const getAuthorInBooks: AuthorInBooks[] = await this.authorInBooksRepository.findAll<AuthorInBooks>();

        return getAuthorInBooks;
    }

    // public async getAuthorInBooksById(id: string): Promise<AuthorInBooks> {
    //     const AuthorInBookId: UpdateAuthorInBooksModel = {};
    //     AuthorInBookId.id = id;
    //     const authorInBook: AuthorInBooks = await this.authorInBooksRepository.findOne(AuthorInBookId.id);

    //     return authorInBook;
    // }

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

    //   public async deleteAuthorInBook(authorInBookId: string): Promise<boolean|string> {
    //     const authorInBook: AuthorInBooks = {};
    //     authorInBook.id = authorInBookId;

    //     const result: DeleteResult = await this.authorInBooksRepository.delete(authorInBook);
    //     if (result.affected === 0) {
    //         const messege: string = 'id not found';

    //         return messege;
    //     }

    //     return true;
    // }
}
