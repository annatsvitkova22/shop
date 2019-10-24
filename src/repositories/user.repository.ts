// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository, DeleteResult, createConnection } from 'typeorm';

// import { User } from 'src/entity';
// import { Enviroment, getEnv } from 'src/environment/environment';

// const myEnvitonment: Enviroment = getEnv();

// @Injectable()
// export class UserRepository {
//     public async createUser(createUser: User) {
//         let user;
//         createConnection({
//             type: 'mysql',
//             host: myEnvitonment.databaseHost,
//             port: myEnvitonment.databasePort,
//             username: myEnvitonment.databaseUsername,
//             password: myEnvitonment.databasePassword,
//             database: myEnvitonment.database,
//             entities: [User],
//             synchronize: true,
//             logging: false,
//         }).then(async connection => {
//             user = await connection.manager.save(createUser);

//         }).catch(error => console.log(error));

//         return user;
//     }

//     // public async getUsers(): Promise<User[]> {
//     //     const getUsers: User[] = await this.userRepository.find();

//     //     return getUsers;
//     // }

//     // public async getUsersById(userId: User): Promise<User[]> {
//     //     const findUser: User[] = await this.userRepository.find({
//     //         select: ['firstName', 'lastName', 'passwordHash', 'email'],
//     //         where: [{ id: userId.id }],
//     //     });

//     //     return findUser;
//     // }

//     public async getUserById(getUser: User): Promise<User> {
//         let findUser;
//         createConnection({
//             type: 'mysql',
//             host: myEnvitonment.databaseHost,
//             port: myEnvitonment.databasePort,
//             username: myEnvitonment.databaseUsername,
//             password: myEnvitonment.databasePassword,
//             database: myEnvitonment.database,
//             entities: [User],
//             synchronize: true,
//             logging: false,
//         }).then(async connection => {
//             findUser = await connection.manager.findOne(getUser.id);
//         }).catch(error => console.log(error));

//         return findUser;
//     }

//     public async getUserByEmail(email: string): Promise<User> {
//         let findUser;
//         createConnection({
//             type: 'mysql',
//             host: myEnvitonment.databaseHost,
//             port: myEnvitonment.databasePort,
//             username: myEnvitonment.databaseUsername,
//             password: myEnvitonment.databasePassword,
//             database: myEnvitonment.database,
//             entities: [User],
//             synchronize: true,
//             logging: false,
//         }).then(async connection => {
//             findUser = await connection.manager.findOne(email);
//         }).catch(error => console.log(error));

//         return findUser;
//     }

//     // public async deleteUser(user: User): Promise<DeleteResult> {
//     //     const result: Promise<DeleteResult> = this.userRepository.delete(user);

//     //     return result;
//     // }
// }
