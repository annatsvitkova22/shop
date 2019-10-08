import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException, Body } from '@nestjs/common';
import { AuthService } from 'src/services/auth.service';
import { CreateUserModel } from 'src/models';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService) {
    super();
  }

  public async validate(getUser: CreateUserModel): Promise<CreateUserModel> {
    console.log("getUser");
    const user = await this.authService.validateUser(getUser);
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
