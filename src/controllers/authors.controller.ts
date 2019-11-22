import { Controller, Post, Body, Get, Put, Delete, Param, UseGuards} from '@nestjs/common';
import { ApiUseTags, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/common';

import { AuthorService } from 'src/services';
import { CreateAuthorModel, UpdateAuthorModel } from 'src/models';
import { Author } from 'src/entity';

@ApiUseTags('Author')
@Controller('author')
export class AuthorsController {

    constructor(private authorService: AuthorService) { }
    @UseGuards(AuthGuard('jwt'))
    @Get()
    @Roles('admin')
    @ApiOperation({ title: 'Search all authors by id'})
    public async getAll(): Promise<Author[]> {
        const author: Author[] = await this.authorService.getAuthors();

        return author;
    }
    @UseGuards(AuthGuard('jwt'))
    @Get(':id')
    @Roles('admin')
    @ApiOperation({ title: 'Search author by id'})
    public async get(@Param() params): Promise<Author> {
        const author: Author = await this.authorService.getAuthorById(params.id);

        return author;
    }

    @Post()
    @ApiOperation({ title: 'Create author'})
    public async create(@Body() createAuthor: CreateAuthorModel): Promise<Author> {
        const author: Author = await this.authorService.createAuthor(createAuthor);

        return author;
    }

    @UseGuards(AuthGuard('jwt'))
    @Put()
    @Roles('admin')
    @ApiOperation({ title: 'Update author by id'})
    public update(@Body() updateAuthor: UpdateAuthorModel): Promise<Author> {
        const author: Promise<Author> = this.authorService.updateAuthor(updateAuthor);

        return author;
    }

    @UseGuards(AuthGuard('jwt'))
    @Put(':id')
    @Roles('admin')
    @ApiOperation({ title: 'Delete printing edition by id' })
    public async remove(@Param() params): Promise<Author> {
        const removed: Author = await this.authorService.removeAuthor(params.id);

        return removed;
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    @Roles('admin')
    @ApiOperation({ title: 'Delete author by id'})
    public async delete(@Param() params): Promise<number>  {
        const deleted: number = await this.authorService.deleteAuthor(params.id);

        return deleted;
    }
}
