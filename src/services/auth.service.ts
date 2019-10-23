// import { Injectable, Inject, forwardRef } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';

// import { Repository } from 'typeorm';
// import * as jsonwebtoken from 'jsonwebtoken';

// import { User } from 'src/entity';
// import { AuthenticatedUserModel } from 'src/models';
// import { Enviroment, getEnv } from 'src/environment/environment';
// import { HashHelper } from 'src/common';

// const jwt = jsonwebtoken;
// const myEnvitonment: Enviroment = getEnv();

// @Injectable()
// export class AuthService {

//   constructor(
//     @Inject(forwardRef(() => HashHelper)) private readonly hashHelper: HashHelper,
//     @InjectRepository(User) private userRepository: Repository<User>,
//   ) {}

//   public async validateUser(username: string, password: string): Promise<AuthenticatedUserModel> {
//     const user = await this.userRepository.query('SELECT user.*, role.name FROM user_in_roles INNER JOIN role ON user_in_roles.role_id = role.id INNER JOIN user ON user_in_roles.user_id = user.id WHERE user.email = ?', [username]);

//     if (!user) {

//       return null;
//     }

//     const isPasswordValid = await this.hashHelper.compareHash(password, user[0].passwordHash);

//     if ( isPasswordValid) {
//         const result: AuthenticatedUserModel = {};
//         result.firstName = user[0].firstName;
//         result.userId = user[0].id;
//         result.role = user[0].name;

//         return result;
//     }

//     return null;
//   }

//   public getToken(user: User): string {
//     const accessToken: string = jwt.sign(user, myEnvitonment.tokenSecret, { expiresIn: myEnvitonment.tokenLife });

//     return accessToken;
//   }

//   public getRefresh(user: User): string {
//     const refreshToken: string = jwt.sign(user, myEnvitonment.tokenSecret, { expiresIn: myEnvitonment.refreshTokenLife });

//     return refreshToken;
//   }
// }
