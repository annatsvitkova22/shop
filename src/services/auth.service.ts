import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/models';
import { Enviroment, getEnv } from 'src/environment/environment';
import { ValidateUser } from 'src/models';

const jwt = require('jsonwebtoken');
const myEnvitonment: Enviroment = getEnv();

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
  ) { }

  public async validateUser(username: string, pass: string): Promise<ValidateUser> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;

      return result;
    }

    return null;
  }

  public getToken(user: User) {
    const accessToken: string = jwt.sign(user, myEnvitonment.tokenSecret, { expiresIn: myEnvitonment.tokenLife });

    return accessToken;
  }

  public getRefresh(payload: User) {
    const user = {
      role: payload.role,
      userId: payload.userId,
      username: payload.username,
    };
    const refreshToken: string = jwt.sign(user, myEnvitonment.tokenSecret, { expiresIn: myEnvitonment.refreshTokenLife });

    return refreshToken;
  }
}
