import { Controller, Post, Body, Get, Put, Delete, Param, UseGuards} from '@nestjs/common';
import { ApiUseTags, ApiOperation } from '@nestjs/swagger';

import { AuthorService } from 'src/services';
import { CreateAuthorModel, UpdateAuthorModel } from 'src/models';
import { Author } from 'src/entity';

@ApiUseTags('Author')
@Controller('author')
export class AuthorsController {

    constructor(private authorService: AuthorService) { }

    @Get(':id')
    @ApiOperation({ title: 'Search author by id'})
    public async get(@Param() params): Promise<Author> {
        const author: Author = await this.authorService.getAuthorById(params.id);

        return author;
    }

    @Get()
    @ApiOperation({ title: 'Search all authors by id'})
    public async getAll(): Promise<Author[]> {
        const author: Author[] = await this.authorService.getAuthors();

        return author;
    }

    @Post()
    @ApiOperation({ title: 'Create author'})
    public async create(@Body() author: CreateAuthorModel): Promise<Author> {
        const createAuthor: Author = await this.authorService.createAuthor(author);

        return createAuthor;
    }

    @Put()
    @ApiOperation({ title: 'Update author by id'})
    public update(@Body() author: UpdateAuthorModel): Promise<Author> {
        const updateAuthor: Promise<Author> = this.authorService.updateAuthor(author);

        return updateAuthor;
    }

    @Delete(':id')
    @ApiOperation({ title: 'Delete author by id'})
    public async delete(@Param() params): Promise<number>  {
        const deleted: number = await this.authorService.deleteAuthor(params.id);

        return deleted;
    }
}
