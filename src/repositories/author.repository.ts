// import { Injectable } from '@nestjs/common';
// import { Author } from 'src/entity';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository, DeleteResult, EntityRepository, AbstractRepository } from 'typeorm';

// @EntityRepository(Author)
// @Injectable()
// export class AuthorRepository  {
//     constructor(@InjectRepository(Author) private authorRepository: Repository<Author>) { }

//     public async createAuthor(createAuthor: Author): Promise<Author>  {
//         const author = await this.authorRepository.save(createAuthor);

//         return author;
//     }

//     public async getAuthors(): Promise<Author[]> {
//         const getAuthors: Author[] = await this.authorRepository.find();

//         return getAuthors;
//     }

//     public async getAuthorsById(authorId: Author): Promise<Author[]> {
//         const findAuthor: Author[] = await this.authorRepository.find({ id: authorId.id });

//         return findAuthor;
//     }

//     public async getAuthorById(getAuthor: Author): Promise<Author> {
//         const findAuthor: Author = await this.authorRepository.findOne(getAuthor.id);

//         return findAuthor;
//     }

//     public async deleteAuthor(author: Author): Promise<DeleteResult> {
//         const result: Promise<DeleteResult> = this.authorRepository.delete(author);

//         return result;
//     }
// }
