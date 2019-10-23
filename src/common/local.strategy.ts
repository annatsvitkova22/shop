// import { Strategy } from 'passport-local';
// import { PassportStrategy } from '@nestjs/passport';
// import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { AuthService } from 'src/services/auth.service';
// import { AuthenticatedUserModel } from 'src/models/';

// @Injectable()
// export class LocalStrategy extends PassportStrategy(Strategy) {
//   constructor(
//     private readonly authService: AuthService) {
//     super();
//   }

//   public async validate(username: string, password: string): Promise<AuthenticatedUserModel> {
//     const user: AuthenticatedUserModel = await this.authService.validateUser(username, password);
//     if (!user) {
//       throw new UnauthorizedException();
//     }
//     return user;
//   }
// }
