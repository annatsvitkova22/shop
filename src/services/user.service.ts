import { Injectable, Inject, forwardRef } from '@nestjs/common';

import { User } from 'src/entity';
import { UpdateUserModel, CreateUserModel, ForgotPassword, CreatedUserModel, UserInfoModel, UserWithRoleModel } from 'src/models';
import { HashHelper, MailerHelper, UuidHelper } from 'src/common/';
import { UserRepository } from 'src/repositories/user.repository';

@Injectable()
export class UserService {
    public saltRounds = 10;
    constructor(
        @Inject(forwardRef(() => MailerHelper)) public emailHelper: MailerHelper,
        @Inject(forwardRef(() => HashHelper)) public readonly hashHelper: HashHelper,
        private readonly userRepository: UserRepository,
        @Inject(forwardRef(() => UuidHelper)) public uuidHelper: UuidHelper,
    ) { }

    public async getUsers(): Promise<User[]> {
        const getUsers: User[] = await this.userRepository.getUsers();

        return getUsers;
    }

    public async getUserById(id: string): Promise<User> {
        const foundUser: User = await this.userRepository.getUserById(id);

        return foundUser;
    }

    public async createUser(createUser: CreateUserModel, req): Promise<UserInfoModel> {
        const url: string = req.protocol + '://' + req.hostname;
        const user: User = new User();
        const showedUser: CreatedUserModel = new CreatedUserModel();
        const userModel: UserInfoModel = new UserInfoModel();
        user.firstName = createUser.firstName;
        user.lastName = createUser.lastName;
        user.email = createUser.email;
        user.id = this.uuidHelper.uuidv4();

        const foundUser: User = await this.userRepository.getUserByEmail(user.email);

        if (foundUser) {
            const error: UserInfoModel = new UserInfoModel();
            error.message = 'user with this email already exists';

            return error;
        }

        const randomSalt: string = await this.hashHelper.getRandomSalt();
        user.salt = randomSalt;

        const pass: string = await this.hashHelper.getHash(createUser.passwordHash, randomSalt);
        user.passwordHash = pass;

        user.emailConfirmed = false;
        user.saltForEmail = '0';

        const savedUser: User = await this.userRepository.createUser(user);

        if (savedUser) {
            const saltEmail: string = await this.emailHelper.sendEmail(user.email, url);
            user.saltForEmail = saltEmail;

            const savedUserWithSaltEmail: User = await this.userRepository.createUser(user);
            showedUser.id = savedUserWithSaltEmail.id;
            showedUser.firstName = savedUserWithSaltEmail.firstName;
            showedUser.lastName = savedUserWithSaltEmail.lastName;
            showedUser.email = savedUserWithSaltEmail.email;
            showedUser.emailConfirmed = savedUserWithSaltEmail.emailConfirmed;
            userModel.userCreateModel = showedUser;

            return userModel;
        }

        showedUser.id = savedUser.id;
        showedUser.firstName = savedUser.firstName;
        showedUser.lastName = savedUser.lastName;
        showedUser.email = savedUser.email;
        showedUser.emailConfirmed = savedUser.emailConfirmed;
        userModel.userCreateModel = showedUser;

        return userModel;
    }

    public async updateUser(updateUser: UpdateUserModel): Promise<User> {
        const user: User = new User();
        user.id = updateUser.id;
        user.firstName = updateUser.firstName;
        user.lastName = updateUser.lastName;
        user.passwordHash = updateUser.passwordHash;
        user.email = updateUser.email;

        const toUpdate: User = await this.userRepository.getUserById(user.id);
        toUpdate.firstName = user.firstName;
        toUpdate.lastName = user.lastName;
        toUpdate.passwordHash = user.passwordHash;
        toUpdate.email = user.email;

        const savedUser: User = await this.userRepository.createUser(toUpdate);

        return savedUser;
    }

    public async deleteUser(userId: string): Promise<number> {
        const result: number = await this.userRepository.deleteUser(userId);

        return result;
    }

    public async findByEmail(mail: string): Promise<User> {
        const foundUser: User = await this.userRepository.getUserByEmail(mail);

        return foundUser;
    }

    public async findUserWithRoleByEmail(username: string): Promise<UserWithRoleModel[]> {
        const foundUser: UserWithRoleModel[] = await this.userRepository.getUserWithRoleByEmail(username);

        return foundUser;
    }

    public async validateToken(token: string, user: User): Promise<UserInfoModel> {
        if (user.saltForEmail === token) {
            user.emailConfirmed = true;
        }
        if (user.saltForEmail !== token) {
            const error = new UserInfoModel();
            error.message = 'sorry, it`s not your token';

            return error;
        }

        user.saltForEmail = '0';
        const savedUser: User = await this.userRepository.createUser(user);
        const info = new UserInfoModel();
        if (savedUser) {
            info.message = 'Your email confirmed';

            return info;
        }

        info.message = 'Сonfirmation error';

        return info;
    }

    public async forgotPassword(forgotPassword: ForgotPassword, req): Promise<UserInfoModel> {
        const url = req.protocol + '://' + req.hostname + req.url;
        const user = await this.userRepository.getUserByEmail(forgotPassword.email);

        const saltForEmail: string = await this.emailHelper.sendEmail(user.email, url);
        user.saltForEmail = saltForEmail;
        user.emailConfirmed = false;

        const savedUser: User = await this.userRepository.createUser(user);
        const userModel = new UserInfoModel();
        userModel.user = savedUser;

        if (!user) {
            const error = new UserInfoModel();
            error.message = 'Sorry, email not found';

            return error;
        }

        return userModel;
    }

    public async validateForgotPassword(forgotPassword: ForgotPassword, email: string): Promise<UserInfoModel> {
        const user = await this.userRepository.getUserByEmail(email);
        const error = new UserInfoModel();
        if (user.emailConfirmed !== true) {
            error.message = 'sorry, password not verified';

            return error;
        }
        if (forgotPassword.password === forgotPassword.repeatPassword) {
            const randomSalt: string = await this.hashHelper.getRandomSalt();
            user.salt = randomSalt;

            const pass: string = await this.hashHelper.getHash(forgotPassword.password, randomSalt);
            user.passwordHash = pass;

            const savedUser: User = await this.userRepository.createUser(user);
            const userModel = new UserInfoModel();
            userModel.user = savedUser;

            return userModel;
        }
        error.message = 'Passwords do not match';

        return error;
    }

}
