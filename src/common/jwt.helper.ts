import { Injectable } from '@nestjs/common';
import { ValidateUser } from 'src/models';

@Injectable()
export class JwtHelper {
    public async hasUser(req): Promise<ValidateUser> {
        let token = req.headers.authorization;
        token = token.substring(6, token.length).trim();
        const jwt = require('jsonwebtoken');
        const user: ValidateUser = jwt.decode(token);
        const hasUser: ValidateUser = {};
        hasUser.userId = user.userId;
        hasUser.firstName = user.firstName;
        hasUser.role = user.role;

        return hasUser;
    }
}
