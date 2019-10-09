import { Injectable, Body } from '@nestjs/common';
import { UserService } from 'src/services';
import { User } from 'src/entity';
import { CreateUserModel } from 'src/models';
import { Enviroment, getEnv } from 'src/environment/environment';
import { ValidateUser } from 'src/models';
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

  public async validateUser(getUser: CreateUserModel): Promise<CreateUserModel> {
    const newUser: User = {} as User;
    newUser.firstName = getUser.firstName;
    newUser.lastName = getUser.lastName;
    newUser.passwordHash = getUser.passwordHash;
    newUser.email = getUser.email;
    const user = await this.userRepository.findOne({ email: newUser.email });
    if (!user) {
      return null;
    }
    if (user) {
      const getPassword = await this.compareHash(getUser.passwordHash, user.passwordHash);
      if (getPassword) {
        const { passwordHash, ...result } = user;
        return result;
      }
    }

    return null;
  }

  public getToken(user: User) {
    const accessToken: string = jwt.sign(user, myEnvitonment.tokenSecret, { expiresIn: myEnvitonment.tokenLife });

    return accessToken;
  }

  public getRefresh(payload: User) {
    const user = {
      role: payload.userRoleConnection,
      userId: payload.lastName,
      username: payload.firstName,
    };
    const refreshToken: string = jwt.sign(user, myEnvitonment.tokenSecret, { expiresIn: myEnvitonment.refreshTokenLife });

    return refreshToken;
  }

  async compareHash(password: string|undefined, hash: string|undefined): Promise<boolean> {
    const result = bcrypt.compare(password, hash);
    return result;
  }
}
