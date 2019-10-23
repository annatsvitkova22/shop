import { Controller, Post, Body, Get, Put, Delete, Param} from '@nestjs/common';
import { ApiUseTags, ApiOperation } from '@nestjs/swagger';

import { TestService } from 'src/services/test.service';
import { CreateAuthorModel, UpdateAuthorModel } from 'src/models';

@ApiUseTags('Test')
@Controller('test')
export class TestController {

    constructor(private testService: TestService) { }

    @Post()
    @ApiOperation({ title: 'Create author'})
    public create(@Body() test: CreateAuthorModel): Promise<string> {
        const createTest: Promise<string> = this.testService.createAuthor(test);

        return createTest;
    }
}
