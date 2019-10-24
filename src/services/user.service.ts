import { Injectable, Inject, forwardRef } from '@nestjs/common';

import { User } from 'src/entity';
import { UpdateUserModel, CreateUserModel, ForgotPassword } from 'src/models';
import { HashHelper, MailerHelper } from 'src/common/';

@Injectable()
export class UserService {
    public saltRounds = 10;
    constructor(
        @Inject(forwardRef(() => MailerHelper)) public emailHelper: MailerHelper,
        public readonly hashHelper: HashHelper,
        @Inject('UserRepository') private readonly userRepository: typeof User,
    ) { }

    public async getUsers(): Promise<User[]> {
        const getUsers: User[] = await this.userRepository.findAll();

        return getUsers;
    }

    public async getUserById(id: string): Promise<User> {
        const user = new UpdateUserModel();
        user.id = id;
        const foundUser: User = await this.userRepository.findOne({
            where: {id: user.id},
          });

        return foundUser;
    }

    public async createUser(createUser: CreateUserModel, req): Promise<User | string> {
        const url: string = req.protocol + '://' + req.hostname;
        const user = new User();
        user.firstName = createUser.firstName;
        user.lastName = createUser.lastName;
        user.email = createUser.email;

        const foundUser: User = await this.findByEmail(user.email);
        if (foundUser) {
            const message: string = 'user with this email already exists';

            return message;
        }

        const randomSalt: string = await this.hashHelper.getRandomSalt();
        user.salt = randomSalt;

        const pass: string = await this.hashHelper.getHash(createUser.passwordHash, randomSalt);
        user.passwordHash = pass;

        user.emailConfirmed = false;
        user.saltForEmail = '0';
        const savedUser: User = await this.userRepository.create<User>(user);

        if (savedUser) {
            const saltForEmail: string = await this.emailHelper.sendEmail(user.email, url);
            savedUser.saltForEmail = saltForEmail;
            const savedUserWithSaltEmail: User = await this.userRepository.create<User>(user);

            return savedUserWithSaltEmail;
        }

        return savedUser;
    }

    // public async updateUser(updateUser: UpdateUserModel): Promise<User> {
    //     const user: User = {};
    //     user.id = updateUser.id;
    //     user.firstName = updateUser.firstName;
    //     user.lastName = updateUser.lastName;
    //     user.passwordHash = updateUser.passwordHash;
    //     user.email = updateUser.email;

    //     const toUpdate: User = await this.userRepository.findOne(user.id);
    //     toUpdate.firstName = user.firstName;
    //     toUpdate.lastName = user.lastName;
    //     toUpdate.passwordHash = user.passwordHash;
    //     toUpdate.email = user.email;

    //     const savedUser: User = await this.userRepository.save(toUpdate);

    //     return savedUser;
    // }

    public async deleteUser(userId: string): Promise<number> {
        const result: number = await this.userRepository.destroy({
            where: { id: userId },
          });

        return result;
    }

    public async findByEmail(mail: string): Promise<User> {
        const foundUser: User = await this.userRepository.findOne({
            where: {email: mail},
         });

        return foundUser;
    }

    public async validateToken(token: string, user: User): Promise<string | boolean> {
        if (user.saltForEmail === token) {
            user.emailConfirmed = true;
        }
        if (user.saltForEmail !== token) {
            const messege: string = 'sorry, it`s not your token';

            return messege;
        }

        user.saltForEmail = '0';
        const savedUser: User = await this.userRepository.create<User>(user);

        return savedUser.emailConfirmed;
    }

    public async forgotPassword(forgotPassword: ForgotPassword, req): Promise<string | User> {
        const url = req.protocol + '://' + req.hostname + req.url;
        const user = await this.findByEmail(forgotPassword.email);

        const saltForEmail: string = await this.emailHelper.sendEmail(user.email, url);
        user.saltForEmail = saltForEmail;
        user.emailConfirmed = false;

        const savedUser: User = await this.userRepository.create<User>(user);

        if (!user) {
            const messegeError = 'Sorry, email not found';

            return messegeError;
        }

        return savedUser;
    }

    public async validateForgotPassword(forgotPassword: ForgotPassword, email: string): Promise<User | string> {
        const user = await this.findByEmail(email);
        if (user.emailConfirmed !== true) {
            const messegeError: string = 'sorry, password not verified';

            return messegeError;
        }
        if (forgotPassword.password === forgotPassword.repeatPassword) {
            const randomSalt: string = await this.hashHelper.getRandomSalt();
            user.salt = randomSalt;

            const pass: string = await this.hashHelper.getHash(forgotPassword.password, randomSalt);
            user.passwordHash = pass;

            const savedUser: User = await this.userRepository.create<User>(user);

            return savedUser;
        }
        const messege: string = 'Passwords do not match';

        return messege;
    }

}
