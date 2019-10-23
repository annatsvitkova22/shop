import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository, DeleteResult, getCustomRepository } from 'typeorm';

import { UpdateAuthorModel, CreateAuthorModel } from 'src/models';
import { TestRepository } from 'src/repositories/test.repository';
import { Test } from 'src/entity/test.entity';

@Injectable()
export class TestService {

    constructor( private testRepository: TestRepository) { }

    public async createAuthor(test: CreateAuthorModel): Promise<string> {
        const createTest: Test = {};
        createTest.name = test.name;
        const savedTest: Test = await this.testRepository.createUser(createTest);

        return(savedTest.id);
    }
}
