import { Controller, Post, Body, Get, Put, Delete, Param} from '@nestjs/common';
import { AuthorService } from 'src/services';
import { CreateAuthorModel, UpdateAuthorModel } from 'src/models';

@Controller('author')
export class AuthorsController {

    constructor(
        private authorService: AuthorService,
        ) { }

    @Get(':id')
    get(@Param() params) {
        const author = this.authorService.getAuthorById(params.id);
        return author;
    }

    @Get()
    getAll() {
    const author = this.authorService.getAuthors();
    return author;
  }

    @Post()
    create(@Body() author: CreateAuthorModel) {
        const createAuthor = this.authorService.createAuthor(author);
        return createAuthor;
    }

    @Put()
    update(@Body() author: UpdateAuthorModel) {
        const updateAuthor = this.authorService.updateAuthor(author);
        return updateAuthor;
    }

    @Delete(':id')
    delete(@Param() params) {
        return this.authorService.deleteAuthor(params.id);
    }
}
