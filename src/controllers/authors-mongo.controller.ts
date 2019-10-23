import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { ApiUseTags, ApiOperation } from '@nestjs/swagger';

import { AuthorsMongoService } from 'src/services/authors-mongo.service';
import { CreateAuthorModel, UpdateAuthorMongoModel } from 'src/models';
import { AuthorDocument } from 'src/document';

@ApiUseTags('Author in Mongo')
@Controller('authorsMongo')
export class AuthorsMongoController {
  constructor(private readonly authorsService: AuthorsMongoService) { }

  @Get()
  @ApiOperation({ title: 'Search all authors by id'})
  public async getAll() {
    const authors = await this.authorsService.getAuthors();

    return authors;
  }

  @Get(':id')
  @ApiOperation({ title: 'Search authors by id'})
  public async get(@Param('id') authorId: string): Promise<AuthorDocument> {
    const author: AuthorDocument = await this.authorsService.getAuthorById(authorId);

    return author;
  }

  @Post()
  @ApiOperation({ title: 'Create author'})
  public async create(@Body() createAuthor: CreateAuthorModel): Promise<AuthorDocument> {
    const getAuthor: AuthorDocument = await this.authorsService.createAuthor(createAuthor);

    return  getAuthor;
  }

  @Put()
  @ApiOperation({ title: 'Update author by id'})
  public async update(@Body() updateAuthor: UpdateAuthorMongoModel): Promise<AuthorDocument> {
    const author: AuthorDocument = await this.authorsService.updateAuthor(updateAuthor);

    return author;
  }

  @Delete(':id')
  @ApiOperation({ title: 'Delete author by id'})
  public async delete(@Param('id') authorId: string): Promise<boolean> {
    await this.authorsService.deleteAuthor(authorId);

    return true;
  }
}
