import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import * as jsonwebtoken from 'jsonwebtoken';

import { User } from 'src/entity';
import { AuthenticatedUserModel } from 'src/models';
import { Enviroment, getEnv } from 'src/environment/environment';
import { HashHelper } from 'src/common';
import { UserRepository } from 'src/repositories';

const jwt = jsonwebtoken;
const myEnvitonment: Enviroment = getEnv();

@Injectable()
export class AuthService {

  constructor(
    @Inject(forwardRef(() => HashHelper)) private readonly hashHelper: HashHelper,
    private readonly userRepository: UserRepository,
  ) {}

  public async validateUser(username: string, password: string): Promise<AuthenticatedUserModel> {
    // tslint:disable-next-line: max-line-length
    let query: string = 'SELECT user.*, role.name FROM user_in_roles INNER JOIN role ON user_in_roles.role_id = role.id INNER JOIN user ON user_in_roles.user_id = user.id WHERE user.email = ';
    query += username;
    // const user = await this.userRepository.sequelize.query(query);

    // if (!user) {

    //   return null;
    // }

    // const isPasswordValid = await this.hashHelper.compareHash(password, user.passwordHash);

    // if ( isPasswordValid) {
    //     const result = new AuthenticatedUserModel();
    //     result.firstName = user.firstName;
    //     result.userId = user.id;
    //     result.role = user.name;

    //     return result;
    // }

    return null;
  }

  public getToken(user: User): string {
    const accessToken: string = jwt.sign(user, myEnvitonment.tokenSecret, { expiresIn: myEnvitonment.tokenLife });

    return accessToken;
  }

  public getRefresh(user: User): string {
    const refreshToken: string = jwt.sign(user, myEnvitonment.tokenSecret, { expiresIn: myEnvitonment.refreshTokenLife });

    return refreshToken;
  }
}
