import { Controller, Post, Body, Get, Put, Delete, Param} from '@nestjs/common';
import { ApiUseTags, ApiOperation } from '@nestjs/swagger';

import { AuthorService } from 'src/services';
import { CreateAuthorModel, UpdateAuthorModel } from 'src/models';

@ApiUseTags('Authors table')
@Controller('author')
export class AuthorsController {

    constructor(
        private authorService: AuthorService,
        ) { }

    @Get(':id')
    @ApiOperation({ title: 'Search author by id'})
    get(@Param() params) {
        const author = this.authorService.getAuthorById(params.id);

        return author;
    }

    @Get()
    @ApiOperation({ title: 'Search all authors by id'})
    getAll() {
        const author = this.authorService.getAuthors();

        return author;
    }

    @Post()
    @ApiOperation({ title: 'Create author'})
    create(@Body() author: CreateAuthorModel) {
        const createAuthor = this.authorService.createAuthor(author);

        return createAuthor;
    }

    @Put()
    @ApiOperation({ title: 'Update author by id'})
    update(@Body() author: UpdateAuthorModel) {
        const updateAuthor = this.authorService.updateAuthor(author);

        return updateAuthor;
    }

    @Delete(':id')
    @ApiOperation({ title: 'Delete author by id'})
    delete(@Param() params) {

        return this.authorService.deleteAuthor(params.id);
    }
}
