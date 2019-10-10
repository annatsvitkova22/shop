import { Injectable } from '@nestjs/common';
import { User } from 'src/entity';
import { ValidateUser } from 'src/models';
import { Enviroment, getEnv } from 'src/environment/environment';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

const jwt = require('jsonwebtoken');
const myEnvitonment: Enviroment = getEnv();

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  public async validateUser(username: string, password: string): Promise<ValidateUser> {
    const user = await this.userRepository.findOne({ email: username });
    if (!user) {

      return null;
    }

    const getPassword = await this.compareHash(password, user.passwordHash);

    if ( getPassword) {
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

  public async compareHash(password: string|undefined, hash: string|undefined): Promise<boolean> {
    const result = bcrypt.compare(password, hash);

    return result;
  }
}
