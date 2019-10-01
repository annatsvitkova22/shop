import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { User } from 'src/users/users.service';
import { Enviroment, getEnv } from 'src/environment/environment';

const myEnvitonment: Enviroment = getEnv();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: myEnvitonment.tokenSecret,
    });
  }

  public async validate(payload: User) {
    const user = { userId: payload.userId, username: payload.username };
    if(!user) {
      throw new UnauthorizedException();
    }
    return  user
  }
}
