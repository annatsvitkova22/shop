import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { AuthorsMongoService } from 'src/services/authors-mongo.service';
import { CreateAuthorModel, UpdateAuthorMongoModel } from 'src/models';

@Controller('authorsMongo')
export class AuthorsMongoController {
  constructor(
    private readonly authorsService: AuthorsMongoService,
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
    @Body() updateAuthor: UpdateAuthorMongoModel) {
    await this.authorsService.updateAuthor(updateAuthor);

    return true;
  }

  @Delete(':id')
  async removeAuthor(@Param('id') authorId: string) {
    await this.authorsService.deleteAuthor(authorId);

    return true;
  }
}
