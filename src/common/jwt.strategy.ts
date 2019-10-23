import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Enviroment, getEnv } from 'src/environment/environment';
import { AuthenticatedUserModel } from 'src/models';

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

  public async validate(payload): Promise<AuthenticatedUserModel> {
    const user: AuthenticatedUserModel = await { userId: payload.userId, username: payload.firstName, role: payload.role };
    if (!user) {
      throw new UnauthorizedException();
    }
    return  user;
  }
}
