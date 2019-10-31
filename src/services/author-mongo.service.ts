import { Injectable, NotFoundException } from '@nestjs/common';

import { AuthorMongoRepository } from 'src/repositories';
import { CreateAuthorModel, UpdateAuthorMongoModel } from 'src/models';
import { BookDocument, AuthorDocument } from 'src/document';

@Injectable()
export class AuthorsMongoService {
  constructor(
    public readonly authorRepository: AuthorMongoRepository,
  ) { }

  public async getAuthors(): Promise<UpdateAuthorMongoModel[]> {
    const author = await this.authorRepository.getAuthors();
    const allAuthor: UpdateAuthorMongoModel[] = author.map(authors => ({
      id: authors.id,
      name: authors.name,
    }));

    return allAuthor;
  }

  public async getAuthorById(authorId: string): Promise<AuthorDocument> {
    const author: AuthorDocument = await this.findAuthor(authorId);

    return author;
  }

  public async createAuthor(author: CreateAuthorModel): Promise<AuthorDocument> {
    const createAuthor: AuthorDocument = {} as AuthorDocument;
    createAuthor.name = author.name;
    const createdAuthor: AuthorDocument = await this.authorRepository.createAuthor(createAuthor);

    return createdAuthor;
  }

  public async updateAuthor(author: UpdateAuthorMongoModel): Promise<AuthorDocument> {
    const updateAuthor: AuthorDocument = {} as AuthorDocument;
    updateAuthor.id = author.id;
    updateAuthor.name = author.name;
    const updatedAuthor: AuthorDocument = await this.findAuthor(updateAuthor.id);
    if (updateAuthor.name) {
      updatedAuthor.name = updateAuthor.name;
    }

    const result: AuthorDocument = await this.authorRepository.updateAuthor(updatedAuthor);

    return result;
  }

  public async deleteAuthor(authorId: string): Promise<number> {
    const author: AuthorDocument = {} as AuthorDocument;
    author.id = authorId;
    const result = await this.authorRepository.deleteAuthor(author);
    if (result.n === 1) {
      await this.getBookByAuthor(author.id);
    }

    return result.n;
  }

  private async findAuthor(id: string): Promise<AuthorDocument> {
    const author: AuthorDocument = {} as AuthorDocument;
    author.id = id;
    const authorById: AuthorDocument = await this.authorRepository.findAuthorById(author);

    return authorById;
  }

  public async getBookByAuthor(authorId: string): Promise<BookDocument> {
    const bookByAuthor: AuthorDocument = await this.findBookByAuthor(authorId);

    return bookByAuthor;
  }

  private async findBookByAuthor(authorId: string): Promise<BookDocument> {
    const author: AuthorDocument = {} as AuthorDocument;
    author.id = authorId;
    let bookByAuthor: AuthorDocument;
    try {
      bookByAuthor = await this.authorRepository.findBookByAuthor(author);
    } catch (error) {
      throw new NotFoundException('Could not find book.');
    }
    if (!bookByAuthor) {
      throw new NotFoundException('Could not find book.');
    }

    return bookByAuthor;
  }
}
