import { Injectable, NotFoundException } from '@nestjs/common';
import { AuthorDocument } from 'src/document/authors.model';
import { AuthorMongoRepository } from 'src/repositories/author-mongo.repository';
import { CreateAuthorModel, UpdateAuthorMongoModel } from 'src/models';

@Injectable()
export class AuthorsMongoService {
  constructor(
    public readonly authorRepository: AuthorMongoRepository,
  ) { }

  async createAuthor(createAuthor: CreateAuthorModel) {
    const getAuthor: AuthorDocument = {} as AuthorDocument;
    getAuthor.name = createAuthor.name;
    const result = await this.authorRepository.createAuthor(getAuthor);
    return result;
  }

  async getAuthors() {
    const authors = await this.authorRepository.getAuthors();
    const result = authors.map(authors => ({
      id: authors.id,
      name: authors.name,
    }));

    return result;
  }

  async getAuthorById(authorId: string) {
    const author = await this.findAuthor(authorId);

    return author;
  }

  async updateAuthor(updateAuthor: UpdateAuthorMongoModel) {
    const getAuthor: AuthorDocument = {} as AuthorDocument;
    getAuthor.id = updateAuthor.id;
    getAuthor.name = updateAuthor.name;
    const updatedAuthor = await this.findAuthor(getAuthor.id);
    if (getAuthor.name) {
      updatedAuthor.name = getAuthor.name;
    }

    await this.authorRepository.updateAuthor(updatedAuthor);
  }

  async deleteAuthor(authorId: string) {
    const idAuthor: AuthorDocument = {} as AuthorDocument;
    idAuthor.id = authorId;
    const result = await this.authorRepository.deleteAuthor(idAuthor);
    await this.getBookByAuthor(idAuthor.id);
    if (result.n === 0) {
      throw new NotFoundException('Could not find author.');
    }
  }

  private async findAuthor(id: string): Promise<AuthorDocument> {
    const idAuthor: AuthorDocument = {} as AuthorDocument;
    idAuthor.id = id;
    const author = await this.authorRepository.findAuthor(idAuthor);
    return author;
  }

  async getBookByAuthor(authorId: string) {
    const book = await this.findBookByAuthor(authorId);
    const result = {
      id: book.id,
      name: book.name,
      description: book.description,
      price: book.price,
      status: book.status,
      currency: book.currency,
      type: book.type,
      author: book.author,
    };
    return result;
  }

  private async findBookByAuthor(authorId: string) {
    const idAuthor: AuthorDocument = {} as AuthorDocument;
    idAuthor.id = authorId;
    let book;
    try {
      book = await this.authorRepository.findBookByAuthor(idAuthor);
    } catch (error) {
      throw new NotFoundException('Could not find book.');
    }
    if (!book) {
      throw new NotFoundException('Could not find book.');
    }
    return book;
  }
}
