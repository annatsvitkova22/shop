import { Injectable, Inject, forwardRef } from '@nestjs/common';

import * as jsonwebtoken from 'jsonwebtoken';

import { AuthenticatedUserModel, UserWithRoleModel } from 'src/models';
import { Enviroment, getEnv } from 'src/environment/environment';
import { HashHelper } from 'src/common';
import { UserService } from 'src/services';

const jwt = jsonwebtoken;
const myEnvitonment: Enviroment = getEnv();

@Injectable()
export class AuthService {

  constructor(
    @Inject(forwardRef(() => HashHelper)) private readonly hashHelper: HashHelper,
    @Inject(forwardRef(() => UserService)) private readonly userService: UserService,
  ) {}

   public async validateUser(username: string, password: string): Promise<AuthenticatedUserModel> {
    // tslint:disable-next-line: max-line-length
    let query: string = 'SELECT `users`.`id`, `users`.`firstName`, `users`.`passwordHash`, `users`.`email`, `roles`.`name` FROM `userinroles` INNER JOIN `roles` ON `userinroles`.`roleId` = `roles`.`id` INNER JOIN `users` ON `userinroles`.`userId` = `users`.`id` WHERE `users`.`email` = \'';
    query += username + '\'';
    const user: UserWithRoleModel[] = await this.userService.findUserWithRoleByEmail(query);

    if (!user) {

      return null;
    }

    const isPasswordValid: boolean = await this.hashHelper.compareHash(password, user[0].passwordHash);

    if ( isPasswordValid) {
        const result: AuthenticatedUserModel = {};
        result.firstName = user[0].firstName;
        result.userId = user[0].id;
        result.role = user[0].name;

        return result;
    }

    return null;
  }

  public getToken(user: AuthenticatedUserModel): string {
    const accessToken: string = jwt.sign(user, myEnvitonment.tokenSecret, { expiresIn: myEnvitonment.tokenLife });

    return accessToken;
  }

  public getRefresh(user: AuthenticatedUserModel): string {
    const refreshToken: string = jwt.sign(user, myEnvitonment.tokenSecret, { expiresIn: myEnvitonment.refreshTokenLife });

    return refreshToken;
  }
}
