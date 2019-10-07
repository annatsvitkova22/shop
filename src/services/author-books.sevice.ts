import { Injectable } from '@nestjs/common';
import { AuthorInBooks } from 'src/entity';
import { UpdateAuthorInBooksModel, CreateAuthorInBooksModel } from 'src/models';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthorInBookService {

    constructor( @InjectRepository(AuthorInBooks) private authorInBooksRepository: Repository<AuthorInBooks>) { }

    async getAuthorInBooks(): Promise<AuthorInBooks[]> {
        const getAuthorInBooks = await this.authorInBooksRepository.find();
        return getAuthorInBooks;
    }

    async getAuthorInBooksById(id: number) {
        const AuthorInBookId: UpdateAuthorInBooksModel = {};
        AuthorInBookId.id = id;
        const authorInBook = await this.authorInBooksRepository.find({
            select: ['authorId', 'bookId'],
            where: [{ id: AuthorInBookId.id }],
        });
        return authorInBook;
    }

    async createAuthorInBook(createAuthorInBook: CreateAuthorInBooksModel) {
        const getAuthorInBook: AuthorInBooks = {} as AuthorInBooks;
        getAuthorInBook.authorId = createAuthorInBook.authorId;
        getAuthorInBook.bookId = createAuthorInBook.bookId;
        const authorInBook = await this.authorInBooksRepository.save(getAuthorInBook);
        return(authorInBook.id);
    }

    async updateAuthorInBook(updateAuthorInBook: UpdateAuthorInBooksModel): Promise<AuthorInBooks> {
        const getAuthorInBook: AuthorInBooks = {} as AuthorInBooks;
        getAuthorInBook.id = updateAuthorInBook.id;
        getAuthorInBook.authorId = updateAuthorInBook.authorId;
        getAuthorInBook.bookId = updateAuthorInBook.bookId;
        const toUpdate = await this.authorInBooksRepository.findOne(getAuthorInBook.id);
        delete toUpdate.authorId;
        delete toUpdate.bookId;
        delete getAuthorInBook.id;
        const updated = Object.assign(toUpdate, getAuthorInBook);
        const authorInBook = await this.authorInBooksRepository.save(updated);
        return authorInBook;
      }

    async deleteAuthorInBook(authorInBookId: number) {
        const authorInBook: AuthorInBooks = {} as AuthorInBooks;
        authorInBook.id = authorInBookId;
        const result = this.authorInBooksRepository.delete(authorInBook);
        return result;
    }
}