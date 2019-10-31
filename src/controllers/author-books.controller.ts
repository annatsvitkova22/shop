import { Controller, Post, Body, Get, Put, Delete, Param} from '@nestjs/common';
import { ApiUseTags, ApiOperation } from '@nestjs/swagger';

import { AuthorInBookService } from 'src/services';
import { UpdateAuthorInBooksModel, CreateAuthorInBooksModel } from 'src/models';
import { AuthorInBooks } from 'src/entity';

@ApiUseTags('Author in book')
@Controller('author-book')
export class AuthorInBookController {

    constructor( private authorInBookService: AuthorInBookService ) { }

    @Get()
    @ApiOperation({ title: 'Search all author in books'})
    public async getAll(): Promise<AuthorInBooks[]> {
        const authorInBook: AuthorInBooks[] = await this.authorInBookService.getAuthorInBooks();

        return authorInBook;
  }

  @Get(':id')
    @ApiOperation({ title: 'Search author in book by id'})
    public async get(@Param() params): Promise<AuthorInBooks> {
        const authorInBook: AuthorInBooks = await this.authorInBookService.getAuthorInBooksById(params.id);

        return authorInBook;
    }

    @Post()
    @ApiOperation({ title: 'Create author in book'})
    public async create(@Body() createAuthorInBook: CreateAuthorInBooksModel): Promise<string> {
        const authorInBook: string = await this.authorInBookService.createAuthorInBook(createAuthorInBook);

        return authorInBook;
    }

    @Put()
    @ApiOperation({ title: 'Update author in books by id'})
    public update(@Body() updateAuthorInBook: UpdateAuthorInBooksModel): Promise<AuthorInBooks> {
        const authorInBook: Promise<AuthorInBooks> = this.authorInBookService.updateAuthorInBook(updateAuthorInBook);

        return authorInBook;
    }

    @Delete(':id')
    @ApiOperation({ title: 'Delete author in book by id'})
    public async delete(@Param() params): Promise<number>  {
        const deleted: number  = await this.authorInBookService.deleteAuthorInBook(params.id);

        return deleted;
    }
}
