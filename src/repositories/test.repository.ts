import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult, createConnection } from 'typeorm';
import { Enviroment, getEnv } from 'src/environment/environment';
import { Test } from 'src/entity/test.entity';

const myEnvitonment: Enviroment = getEnv();

@Injectable()
export class TestRepository {
    public async createUser(createTest: Test) {
        let user: Test = {};
        createConnection({
            type: 'mysql',
            host: myEnvitonment.databaseHost,
            port: myEnvitonment.databasePort,
            username: myEnvitonment.databaseUsername,
            password: myEnvitonment.databasePassword,
            database: myEnvitonment.database,
            entities: [Test],
            synchronize: true,
            logging: false,
        }).then(async connection => {
            user = await connection.manager.save(createTest);

        }).catch(error => console.log(error));

        return user;
    }
}
