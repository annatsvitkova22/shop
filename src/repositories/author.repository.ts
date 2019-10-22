import { Injectable } from '@nestjs/common';
import { Author } from 'src/entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult, EntityRepository, AbstractRepository } from 'typeorm';

@EntityRepository(Author)
@Injectable()
export class AuthorRepository extends AbstractRepository<Author> {

    public async createAuthor(createAuthor: Author): Promise<Author>  {
        console.log(createAuthor);
        const author = await this.repository.save(createAuthor);
        console.log(author);
        return author;
    }

    public async getAuthors(): Promise<Author[]> {
        const getAuthors: Author[] = await this.repository.find();

        return getAuthors;
    }

    // public async getAuthorsById(authorId: Author): Promise<Author[]> {
    //     const findAuthor: Author[] = await this.find({ id: authorId.id });

    //     return findAuthor;
    // }

    // public async getAuthorById(getAuthor: Author): Promise<Author> {
    //     const findAuthor: Author = await this.findOne(getAuthor.id);

    //     return findAuthor;
    // }

    // public async deleteAuthor(author: Author): Promise<DeleteResult> {
    //     const result: Promise<DeleteResult> = this.delete(author);

    //     return result;
    // }
}
