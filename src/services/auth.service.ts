import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import * as jsonwebtoken from 'jsonwebtoken';

import { User } from 'src/entity';
import { ValidateUser } from 'src/models';
import { Enviroment, getEnv } from 'src/environment/environment';
import { HashHelper } from 'src/common';

const jwt = jsonwebtoken;
const myEnvitonment: Enviroment = getEnv();

@Injectable()
export class AuthService {

  constructor(
    @Inject(forwardRef(() => HashHelper)) private readonly hashHelper: HashHelper,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  public async validateUser(username: string, password: string): Promise<ValidateUser> {
    const user = await this.userRepository.findOne({ email: username });
    if (!user) {

      return null;
    }

    const isPasswordValid = await this.hashHelper.compareHash(password, user.passwordHash);

    if ( isPasswordValid) {
        const result: ValidateUser = {};
        result.firstName = user.firstName;
        result.userId = user.id;

        return result;
    }

    return null;
  }

  public getToken(user: User): string {
    const accessToken: string = jwt.sign(user, myEnvitonment.tokenSecret, { expiresIn: myEnvitonment.tokenLife });

    return accessToken;
  }

  public getRefresh(payload: User): string {
    const user = {
      role: payload.userRoleConnection,
      userId: payload.lastName,
      username: payload.firstName,
    };
    const refreshToken: string = jwt.sign(user, myEnvitonment.tokenSecret, { expiresIn: myEnvitonment.refreshTokenLife });

    return refreshToken;
  }
}
