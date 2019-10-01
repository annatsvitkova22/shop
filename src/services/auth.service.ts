  
import { Injectable} from '@nestjs/common';
import { UsersService, User } from 'src/users/users.service';
import { Enviroment, getEnv } from 'src/environment/environment';

export interface validateUser {
  userId: number,
  username: string,
  role: string,
}

const jwt = require('jsonwebtoken');
const myEnvitonment: Enviroment = getEnv();

@Injectable()
export class AuthService {
  constructor(
      private readonly usersService: UsersService,
      ) {}

  public async validateUser(username: string, pass: string): Promise<validateUser> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
     
      return result;
    }

    return null;
  }

  public getToken(user: User) {
    const access_token: string = jwt.sign(user, myEnvitonment.tokenSecret, { expiresIn: myEnvitonment.tokenLife});
    
    return access_token;
  }

  public  getRefresh(payload: User){
    const user = {
      role: payload.role,
      userId: payload.userId, 
      username: payload.username,
    };
    const refresh_token: string = jwt.sign(user, myEnvitonment.tokenSecret, { expiresIn: myEnvitonment.refreshTokenLife});

    return refresh_token;
  }
}
