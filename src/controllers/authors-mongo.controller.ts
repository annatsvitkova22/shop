import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { ApiUseTags, ApiOperation } from '@nestjs/swagger';

import { AuthorsMongoService } from 'src/services/authors-mongo.service';
import { CreateAuthorModel, UpdateAuthorMongoModel } from 'src/models';

@ApiUseTags('Author document in Mongo')
@Controller('authorsMongo')
export class AuthorsMongoController {
  constructor(
    private readonly authorsService: AuthorsMongoService,
  ) { }

  @Post()
  @ApiOperation({ title: 'Create author'})
  public async createAuthors(@Body() createAuthor: CreateAuthorModel) {
    const getAuthor = await this.authorsService.createAuthor(createAuthor);

    return { getAuthor };
  }

  @Get()
  @ApiOperation({ title: 'Search all authors by id'})
  public async getAllAuthors() {
    const authors = await this.authorsService.getAuthors();

    return authors;
  }

  @Get(':id')
  @ApiOperation({ title: 'Search authors by id'})
  public async getBook(@Param('id') authorId: string) {
    const author = await this.authorsService.getAuthorById(authorId);

    return author;
  }

  @Patch()
  @ApiOperation({ title: 'Update author by id'})
  public async updateAuthor(
    @Body() updateAuthor: UpdateAuthorMongoModel) {
    await this.authorsService.updateAuthor(updateAuthor);

    return true;
  }

  @Delete(':id')
  @ApiOperation({ title: 'Delete author by id'})
  public async removeAuthor(@Param('id') authorId: string) {
    await this.authorsService.deleteAuthor(authorId);

    return true;
  }
}
