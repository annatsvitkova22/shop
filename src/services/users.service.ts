import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository, DeleteResult } from 'typeorm';

import { User } from 'src/entity';
import { UpdateUserModel, CreateUserModel, ForgotPassword } from 'src/models';
import { HashHelper, MailerHelper } from 'src/common/';

@Injectable()
export class UserService {
    public saltRounds = 10;
    constructor(
        @Inject(forwardRef(() => MailerHelper)) public emailHelper: MailerHelper,
        public readonly hashHelper: HashHelper,
        @InjectRepository(User) private userRepository: Repository<User>,
    ) { }

    public async getUsers(): Promise<User[]> {
        const getUsers: User[] = await this.userRepository.find();

        return getUsers;
    }

    public async getUserById(id: string): Promise<User> {
        const user: UpdateUserModel = {};
        user.id = id;
        const foundUser: User = await this.userRepository.findOne(user.id);

        return foundUser;
    }

    public async createUser(createUser: CreateUserModel, req): Promise<User | string> {
        const url: string = req.protocol + '://' + req.hostname;
        const user: User = {};
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
        const savedUser: User = await this.userRepository.save(user);

        if (savedUser) {
            const saltForEmail: string = await this.emailHelper.sendEmail(user.email, url);
            savedUser.saltForEmail = saltForEmail;
            const savedUserWithSaltEmail: User = await this.userRepository.save(user);

            return savedUserWithSaltEmail;
        }

        return savedUser;
    }

    public async updateUser(updateUser: UpdateUserModel): Promise<User> {
        const user: User = {};
        user.id = updateUser.id;
        user.firstName = updateUser.firstName;
        user.lastName = updateUser.lastName;
        user.passwordHash = updateUser.passwordHash;
        user.email = updateUser.email;

        const toUpdate: User = await this.userRepository.findOne(user.id);
        toUpdate.firstName = user.firstName;
        toUpdate.lastName = user.lastName;
        toUpdate.passwordHash = user.passwordHash;
        toUpdate.email = user.email;

        const savedUser: User = await this.userRepository.save(toUpdate);

        return savedUser;
    }

    public async deleteUser(userId: string): Promise<boolean | string> {
        const user: User = {} as User;
        user.id = userId;
        const result: DeleteResult = await this.userRepository.delete(user);
        if (result.affected === 0) {
            const messege: string = 'Id not found';

            return messege;
        }

        return true;
    }

    public async findByEmail(mail: string): Promise<User> {
        const user: User = await this.userRepository.findOne({ email: mail });

        return user;
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
        const savedUser: User = await this.userRepository.save(user);

        return savedUser.emailConfirmed;
    }

    public async forgotPassword(forgotPassword: ForgotPassword, req): Promise<string | User> {
        const url = req.protocol + '://' + req.hostname + req.url;
        const user = await this.findByEmail(forgotPassword.email);

        const saltForEmail: string = await this.emailHelper.sendEmail(user.email, url);
        user.saltForEmail = saltForEmail;
        user.emailConfirmed = false;

        const savedUser: User = await this.userRepository.save(user);

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

            const savedUser: User = await this.userRepository.save(user);

            return savedUser;
        }
        const messege: string = 'Passwords do not match';

        return messege;
    }

}
