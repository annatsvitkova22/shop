import { Controller, Post, Body, Get, Put, Delete, Param} from '@nestjs/common';
import { ApiUseTags, ApiOperation } from '@nestjs/swagger';

import { DeleteResult } from 'typeorm';

import { AuthorInBookService } from 'src/services';
import { UpdateAuthorInBooksModel, CreateAuthorInBooksModel } from 'src/models';
import { AuthorInBooks } from 'src/entity';

@ApiUseTags('Author in books table')
@Controller('author-book')
export class AuthorInBookController {

    constructor(
        private authorInBookService: AuthorInBookService,
        ) { }

    @Get(':id')
    @ApiOperation({ title: 'Search author in book by id'})
    public get(@Param() params): Promise<AuthorInBooks[]> {
        const authorInBook: Promise<AuthorInBooks[]> = this.authorInBookService.getAuthorInBooksById(params.id);

        return authorInBook;
    }

    @Get()
    @ApiOperation({ title: 'Search all author in books'})
    public getAll(): Promise<AuthorInBooks[]> {
        const authorInBook: Promise<AuthorInBooks[]> = this.authorInBookService.getAuthorInBooks();

        return authorInBook;
  }

    @Post()
    @ApiOperation({ title: 'Create author in book'})
    public create(@Body() authorInBook: CreateAuthorInBooksModel): Promise<number> {
        const createAuthorInBook: Promise<number> = this.authorInBookService.createAuthorInBook(authorInBook);

        return createAuthorInBook;
    }

    @Put()
    @ApiOperation({ title: 'Update author in books by id'})
    public update(@Body() authorInBook: UpdateAuthorInBooksModel): Promise<AuthorInBooks> {
        const updateAuthorInBook: Promise<AuthorInBooks> = this.authorInBookService.updateAuthorInBook(authorInBook);

        return updateAuthorInBook;
    }

    @Delete(':id')
    @ApiOperation({ title: 'Delete author in book by id'})
    public delete(@Param() params): Promise<DeleteResult> {
        const deleted: Promise<DeleteResult> = this.authorInBookService.deleteAuthorInBook(params.id);

        return deleted;
    }
}
