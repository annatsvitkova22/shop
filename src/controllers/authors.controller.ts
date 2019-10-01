import { Controller, Post, Body, Get, Param, Patch, Delete, } from '@nestjs/common';
import { AuthorsService } from 'src/services/authors.service';
  
  @Controller('authors')
  export class AuthorsController {
    constructor(private readonly authorsService: AuthorsService) {}
  
    @Post()
    async addAuthors(
      @Body('name') authorName: string,
    ) {
      const generatedId = await this.authorsService.insertAuthor( authorName );
      
      return { id: generatedId };
    }
  
    @Get()
    async getAllAuthors() {
      const authors = await this.authorsService.getAuthors();
      return authors;
    }
  
    @Get(':id')
    getBook(@Param('id') authorId: string) {
      return this.authorsService.getSingleAuthor(authorId);
    }
  
    @Patch(':id')
    async updateAuthor(
      @Param('id') authorId: string,
      @Body('name') authorName: string,
    ) {
      await this.authorsService.updateAuthor(authorId, authorName);
      return null;
    }
  
    @Delete(':id')
    async removeAuthor(@Param('id') authorId: string) {
        await this.authorsService.deleteAuthor(authorId);
        return null;
    }
  }