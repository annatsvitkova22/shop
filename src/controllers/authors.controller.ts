import { Controller, Post, Body, Get, Put, Delete, Param, UseGuards} from '@nestjs/common';
import { ApiUseTags, ApiOperation } from '@nestjs/swagger';

import { AuthorService } from 'src/services';
import { CreateAuthorModel, UpdateAuthorModel } from 'src/models';
import { Author } from 'src/entity';

@ApiUseTags('Author')
@Controller('author')
export class AuthorsController {

    constructor(private authorService: AuthorService) { }

    @Get()
    @ApiOperation({ title: 'Search all authors by id'})
    public async getAll(): Promise<Author[]> {
        const author: Author[] = await this.authorService.getAuthors();

        return author;
    }

    @Get(':id')
    @ApiOperation({ title: 'Search author by id'})
    public async get(@Param() params): Promise<Author> {
        const author: Author = await this.authorService.getAuthorById(params.id);

        return author;
    }

    @Post()
    @ApiOperation({ title: 'Create author'})
    public async create(@Body() createAuthor: CreateAuthorModel): Promise<Author> {
        const author: Author = await this.authorService.createAuthor(createAuthor);

        return author;
    }

    @Put()
    @ApiOperation({ title: 'Update author by id'})
    public update(@Body() updateAuthor: UpdateAuthorModel): Promise<Author> {
        const author: Promise<Author> = this.authorService.updateAuthor(updateAuthor);

        return author;
    }

    @Delete(':id')
    @ApiOperation({ title: 'Delete author by id'})
    public async delete(@Param() params): Promise<number>  {
        const deleted: number = await this.authorService.deleteAuthor(params.id);

        return deleted;
    }
}
