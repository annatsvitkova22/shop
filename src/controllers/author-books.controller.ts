import { Controller, Post, Body, Get, Put, Delete, Param} from '@nestjs/common';
import { ApiUseTags, ApiOperation } from '@nestjs/swagger';

import { AuthorInBookService } from 'src/services';
import { UpdateAuthorInBooksModel, CreateAuthorInBooksModel } from 'src/models';

@ApiUseTags('Author in books table')
@Controller('author-book')
export class AuthorInBookController {

    constructor(
        private authorInBookService: AuthorInBookService,
        ) { }

    @Get(':id')
    @ApiOperation({ title: 'Search author in book by id'})
    get(@Param() params) {
        const authorInBook = this.authorInBookService.getAuthorInBooksById(params.id);

        return authorInBook;
    }

    @Get()
    @ApiOperation({ title: 'Search all author in books'})
    getAll() {
        const authorInBook = this.authorInBookService.getAuthorInBooks();

        return authorInBook;
  }

    @Post()
    @ApiOperation({ title: 'Create author in book'})
    create(@Body() authorInBook: CreateAuthorInBooksModel) {
        const createAuthorInBook = this.authorInBookService.createAuthorInBook(authorInBook);

        return createAuthorInBook;
    }

    @Put()
    @ApiOperation({ title: 'Update author in books by id'})
    update(@Body() authorInBook: UpdateAuthorInBooksModel) {
        const updateAuthorInBook = this.authorInBookService.updateAuthorInBook(authorInBook);

        return updateAuthorInBook;
    }

    @Delete(':id')
    @ApiOperation({ title: 'Delete author in book by id'})
    delete(@Param() params) {

        return this.authorInBookService.deleteAuthorInBook(params.id);
    }
}
