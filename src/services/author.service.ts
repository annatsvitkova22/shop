import { Injectable, Inject } from '@nestjs/common';

import { Author } from 'src/entity';
import { UpdateAuthorModel, CreateAuthorModel } from 'src/models';
import { UuidHelper } from 'src/common/uuid.helper';

@Injectable()
export class AuthorService {

    constructor(
        @Inject('AuthorRepository') private readonly authorRepository: typeof Author,
        public uuidHelper: UuidHelper,
       ) { }

    public async getAuthors(): Promise<Author[]> {
        const gotAuthors: Author[] = await this.authorRepository.findAll<Author>();

        return gotAuthors;
    }

    public async getAuthorById(id: string): Promise<Author> {
        const author = new UpdateAuthorModel();
        author.id = id;
        const foundAuthor: Author = await this.authorRepository.findOne({
            where: {id: author.id},
          });

        return foundAuthor;
    }

    public async createAuthor(CreateAuthor: CreateAuthorModel): Promise<Author> {
        const author = new Author();
        const validateName = await this.validateName(CreateAuthor.name);
        author.name = validateName;
        author.id = this.uuidHelper.uuidv4();

        const savedAuthor: Author = await author.save();

        return savedAuthor;
    }

    public async updateAuthor(author: UpdateAuthorModel): Promise<Author> {
        const updateAuthor = new Author();
        updateAuthor.id = author.id;
        updateAuthor.name = author.name;

        const validateName = await this.validateName(updateAuthor.name);
        const toUpdate: Author = await this.getAuthorById(updateAuthor.id);
        toUpdate.name = validateName;

        const savedAuthor: Author = await toUpdate.save();

        return savedAuthor;
      }

    public async deleteAuthor(authorId: string): Promise<number> {
        const result: number = await this.authorRepository.destroy({
            where: { id: authorId },
          });

        return result;
    }

    public validateName(name: string): string {
        let validateName: string = name.replace(/\s+/g,' ').trim();
        validateName = validateName[0].toUpperCase() + validateName.substring(1, validateName.length).toLowerCase();

        return validateName;
    }
}
