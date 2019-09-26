  
import { Injectable} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { Env, getEnv } from 'src/environment/environment';

const jwt = require('jsonwebtoken');
const myEnvitonment: Env = getEnv();

// export interface Payload {
//   roles: string,
// }

// export const payload: Payload ={
//   roles: "admin",
// };

@Injectable()
export class AuthService {
  constructor(
      private readonly usersService: UsersService,
      ) {}

  public async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;

      return result;
    }

    return null;
  }

  public async getToken(user: any) {
    const access_token = {
      access_token: jwt.sign(user, myEnvitonment.secret, { expiresIn: myEnvitonment.tokenLife}),
    };
    
    return access_token;
  }

  public async getRefresh(payload: any){
    const user = {
      role: payload.role,
      userId: payload.userId, 
      username: payload.username,
    };
    const refreshToken = {
      refresh_token: jwt.sign(user, myEnvitonment.refreshTokenSecret, { expiresIn: myEnvitonment.refreshTokenLife}),
    };

    return refreshToken;
  }
}
