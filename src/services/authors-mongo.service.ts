import { Injectable, NotFoundException } from '@nestjs/common';
import { AuthorDocument } from 'src/document/authors.model';
import { AuthorMongoRepository } from 'src/repositories/author-mongo.repository';
import { CreateAuthorModel, UpdateAuthorMongoModel } from 'src/models';
import { BookDocument } from 'src/document';

@Injectable()
export class AuthorsMongoService {
  constructor(
    public readonly authorRepository: AuthorMongoRepository,
  ) { }

  public async createAuthor(author: CreateAuthorModel): Promise<AuthorDocument> {
    const createAuthor: AuthorDocument = {} as AuthorDocument;
    createAuthor.name = author.name;
    const createdAuthor = await this.authorRepository.createAuthor(createAuthor);

    return createdAuthor;
  }

  public async getAuthors() {
    const author = await this.authorRepository.getAuthors();
    const allAuthor = author.map(authors => ({
      id: authors.id,
      name: authors.name,
    }));

    return allAuthor;
  }

  public async getAuthorById(authorId: string): Promise<AuthorDocument> {
    const author = await this.findAuthor(authorId);

    return author;
  }

  public async updateAuthor(author: UpdateAuthorMongoModel): Promise<AuthorDocument> {
    const updateAuthor: AuthorDocument = {} as AuthorDocument;
    updateAuthor.id = author.id;
    updateAuthor.name = author.name;
    const updatedAuthor = await this.findAuthor(updateAuthor.id);
    if (updateAuthor.name) {
      updatedAuthor.name = updateAuthor.name;
    }

    const result = await this.authorRepository.updateAuthor(updatedAuthor);

    return result;
  }

  public async deleteAuthor(authorId: string) {
    const author: AuthorDocument = {} as AuthorDocument;
    author.id = authorId;
    const result = await this.authorRepository.deleteAuthor(author);
    await this.getBookByAuthor(author.id);
    if (result.n === 0) {
      throw new NotFoundException('Could not find author.');
    }
    return result;
  }

  private async findAuthor(id: string): Promise<AuthorDocument> {
    const author: AuthorDocument = {} as AuthorDocument;
    author.id = id;
    const authorById = await this.authorRepository.findAuthorById(author);

    return authorById;
  }

  public async getBookByAuthor(authorId: string): Promise<BookDocument> {
    const bookByAuthor = await this.findBookByAuthor(authorId);

    return bookByAuthor;
  }

  private async findBookByAuthor(authorId: string): Promise<BookDocument> {
    const author: AuthorDocument = {} as AuthorDocument;
    author.id = authorId;
    let bookByAuthor;
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
