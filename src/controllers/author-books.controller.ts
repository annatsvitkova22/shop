import { Controller, Post, Body, Get, Put, Delete, Param} from '@nestjs/common';
import { AuthorInBookService } from 'src/services';
import { UpdateAuthorInBooksModel, CreateAuthorInBooksModel } from 'src/models';

@Controller('author-book')
export class AuthorInBookController {

    constructor(
        private authorInBookService: AuthorInBookService,
        ) { }

    @Get(':id')
    get(@Param() params) {
        const authorInBook = this.authorInBookService.getAuthorInBooksById(params.id);
        return authorInBook;
    }

    @Get()
    getAll() {
    const authorInBook = this.authorInBookService.getAuthorInBooks();
    return authorInBook;
  }

    @Post()
    create(@Body() authorInBook: CreateAuthorInBooksModel) {
        const createAuthorInBook = this.authorInBookService.createAuthorInBook(authorInBook);
        return createAuthorInBook;
    }

    @Put()
    update(@Body() authorInBook: UpdateAuthorInBooksModel) {
        const updateAuthorInBook = this.authorInBookService.updateAuthorInBook(authorInBook);
        return updateAuthorInBook;
    }

    @Delete(':id')
    delete(@Param() params) {
        return this.authorInBookService.deleteAuthorInBook(params.id);
    }
}
