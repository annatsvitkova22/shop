import { Controller, Post, Body, Get, Param, Patch, Delete, NotFoundException} from '@nestjs/common';
import { AuthorsService } from 'src/services/authors.service';
  
  @Controller('authors')
  export class AuthorsController {
    constructor(
      private readonly authorsService: AuthorsService,
      ) {}
  
    @Post()
    async createAuthors( @Body('name') authorName: string ) {
      const generatedId = await this.authorsService.insertAuthor( authorName );
      
      return { id: generatedId };
    }
  
    @Get()
    async getAllAuthors() {
      const authors = await this.authorsService.getAuthors();

      return authors;
    }
  
    @Get(':id')
    async getBook(@Param('id') authorId: string) {
      const author = await this.authorsService.getSingleAuthor(authorId);
      
      return author;
    }
  
    @Patch(':id')
    async updateAuthor(
      @Param('id') authorId: string,
      @Body('name') authorName: string,
    ) {
      await this.authorsService.updateAuthor(authorId, authorName);

      return "Ok";
    }
  
    @Delete(':id')
    async removeAuthor(@Param('id') authorId: string) {
        await this.authorsService.deleteAuthor(authorId);
      
        return "Ok";
    }
  }