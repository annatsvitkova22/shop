import { Controller, Post, Body, Get, Put, Delete, Param} from '@nestjs/common';
import { ApiUseTags, ApiOperation } from '@nestjs/swagger';

import { AuthorService } from 'src/services';
import { CreateAuthorModel, UpdateAuthorModel } from 'src/models';
import { Author } from 'src/entity';

@ApiUseTags('Authors table')
@Controller('author')
export class AuthorsController {

    constructor(private authorService: AuthorService) { }

    // @Get(':id')
    // @ApiOperation({ title: 'Search author by id'})
    // public get(id: string): Promise<Author> {
    //     const author: Promise<Author> = this.authorService.getAuthorById(id);

    //     return author;
    // }

    @Get()
    @ApiOperation({ title: 'Search all authors by id'})
    public getAll(): Promise<Author[]> {
        const author: Promise<Author[]> = this.authorService.getAuthors();

        return author;
    }

    @Post()
    @ApiOperation({ title: 'Create author'})
    public create(@Body() author: CreateAuthorModel): Promise<string> {
        const createAuthor: Promise<string> = this.authorService.createAuthor(author);

        return createAuthor;
    }

    // @Put()
    // @ApiOperation({ title: 'Update author by id'})
    // public update(@Body() author: UpdateAuthorModel): Promise<Author> {
    //     const updateAuthor: Promise<Author> = this.authorService.updateAuthor(author);

    //     return updateAuthor;
    // }

    // @Delete(':id')
    // @ApiOperation({ title: 'Delete author by id'})
    // public delete(@Param() params): Promise<boolean|string>  {
    //     const deleted: Promise<boolean|string>  = this.authorService.deleteAuthor(params.id);

    //     return deleted;
    // }
}
