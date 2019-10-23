import { Injectable } from '@nestjs/common';
import { AuthenticatedUserModel } from 'src/models';

@Injectable()
export class JwtHelper {
    public async hasUser(req): Promise<AuthenticatedUserModel> {
        let token = req.headers.authorization;
        token = token.substring(6, token.length).trim();
        const jwt = require('jsonwebtoken');
        const user: AuthenticatedUserModel = jwt.decode(token);
        const hasUser: AuthenticatedUserModel = {};
        hasUser.userId = user.userId;
        hasUser.firstName = user.firstName;
        hasUser.role = user.role;

        return hasUser;
    }
}
