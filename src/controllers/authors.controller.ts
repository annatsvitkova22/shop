import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { AuthorsService } from 'src/services/authors.service';
import { CreateAuthorModel, UpdateAuthorModel } from 'src/models';

@Controller('authors')
export class AuthorsController {
  constructor(
    private readonly authorsService: AuthorsService,
  ) { }

  @Post()
  async createAuthors(@Body() createAuthor: CreateAuthorModel) {
    const getAuthor = await this.authorsService.createAuthor(createAuthor);

    return { getAuthor };
  }

  @Get()
  async getAllAuthors() {
    const authors = await this.authorsService.getAuthors();

    return authors;
  }

  @Get(':id')
  async getBook(@Param('id') authorId: string) {
    const author = await this.authorsService.getAuthorById(authorId);

    return author;
  }

  @Patch()
  async updateAuthor(
    @Body() updateAuthor: UpdateAuthorModel) {
    await this.authorsService.updateAuthor(updateAuthor);

    return true;
  }

  @Delete(':id')
  async removeAuthor(@Param('id') authorId: string) {
    await this.authorsService.deleteAuthor(authorId);

    return true;
  }
}
