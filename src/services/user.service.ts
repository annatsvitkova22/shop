import { Injectable, Inject, forwardRef } from '@nestjs/common';

import { User } from 'src/entity';
import { UpdateUserModel, CreateUserModel, ForgotPassword, CreatedUserModel } from 'src/models';
import { HashHelper, MailerHelper, UuidHelper } from 'src/common/';

@Injectable()
export class UserService {
    public saltRounds = 10;
    constructor(
        @Inject(forwardRef(() => MailerHelper)) public emailHelper: MailerHelper,
        public readonly hashHelper: HashHelper,
        @Inject('UserRepository') private readonly userRepository: typeof User,
        @Inject(forwardRef(() => UuidHelper)) public uuidHelper: UuidHelper,
    ) { }

    public async getUsers(): Promise<User[]> {
        const getUsers: User[] = await this.userRepository.findAll();

        return getUsers;
    }

    public async getUserById(id: string): Promise<User> {
        const user = new UpdateUserModel();
        user.id = id;
        const foundUser: User = await this.userRepository.findOne({
            where: { id: user.id },
        });

        return foundUser;
    }

    public async createUser(createUser: CreateUserModel, req): Promise<CreatedUserModel> {
        const url: string = req.protocol + '://' + req.hostname;
        const user = new User();
        const showedUser = new CreatedUserModel();
        user.firstName = createUser.firstName;
        user.lastName = createUser.lastName;
        user.email = createUser.email;
        user.id = this.uuidHelper.uuidv4();

        const foundUser: User = await this.findByEmail(user.email);

        if (foundUser) {
            const error = new CreatedUserModel();
            error.message = 'user with this email already exists';

            return error;
        }

        const randomSalt: string = await this.hashHelper.getRandomSalt();
        user.salt = randomSalt;

        const pass: string = await this.hashHelper.getHash(createUser.passwordHash, randomSalt);
        user.passwordHash = pass;

        user.emailConfirmed = false;
        user.saltForEmail = '0';

        const savedUser: User = await user.save();

        if (savedUser) {
            const saltEmail: string = await this.emailHelper.sendEmail(user.email, url);
            user.saltForEmail = saltEmail;

            const savedUserWithSaltEmail: User = await user.save();
            showedUser.id = savedUserWithSaltEmail.id;
            showedUser.firstName = savedUserWithSaltEmail.firstName;
            showedUser.lastName = savedUserWithSaltEmail.lastName;
            showedUser.email = savedUserWithSaltEmail.email;
            showedUser.emailConfirmed = savedUserWithSaltEmail.emailConfirmed;

            return showedUser;
        }

        showedUser.id = savedUser.id;
        showedUser.firstName = savedUser.firstName;
        showedUser.lastName = savedUser.lastName;
        showedUser.email = savedUser.email;
        showedUser.emailConfirmed = savedUser.emailConfirmed;

        return showedUser;
    }

    public async updateUser(updateUser: UpdateUserModel): Promise<User> {
        const user = new User();
        user.id = updateUser.id;
        user.firstName = updateUser.firstName;
        user.lastName = updateUser.lastName;
        user.passwordHash = updateUser.passwordHash;
        user.email = updateUser.email;

        const toUpdate: User = await this.getUserById(user.id);
        toUpdate.firstName = user.firstName;
        toUpdate.lastName = user.lastName;
        toUpdate.passwordHash = user.passwordHash;
        toUpdate.email = user.email;

        const savedUser: User = await toUpdate.save();

        return savedUser;
    }

    public async deleteUser(userId: string): Promise<number> {
        const result: number = await this.userRepository.destroy({
            where: { id: userId },
        });

        return result;
    }

    public async findByEmail(mail: string): Promise<User> {
        const foundUser: User = await this.userRepository.findOne({
            where: { email: mail },
        });

        return foundUser;
    }

    public async validateToken(token: string, user: User): Promise<CreatedUserModel> {
        if (user.saltForEmail === token) {
            user.emailConfirmed = true;
        }
        if (user.saltForEmail !== token) {
            const error = new CreatedUserModel();
            error.message = 'sorry, it`s not your token';

            return error;
        }

        user.saltForEmail = '0';
        const savedUser: User = await user.save();
        const info = new CreatedUserModel();
        if (savedUser) {
            info.message = 'Your email confirmed';

            return info;
        }

        info.message = 'Сonfirmation error';

        return info;
    }

    public async forgotPassword(forgotPassword: ForgotPassword, req): Promise<CreatedUserModel> {
        const url = req.protocol + '://' + req.hostname + req.url;
        const user = await this.findByEmail(forgotPassword.email);

        const saltForEmail: string = await this.emailHelper.sendEmail(user.email, url);
        user.saltForEmail = saltForEmail;
        user.emailConfirmed = false;

        const savedUser: User = await user.save();

        if (!user) {
            const error = new CreatedUserModel();
            error.message = 'Sorry, email not found';

            return error;
        }

        return savedUser;
    }

    public async validateForgotPassword(forgotPassword: ForgotPassword, email: string): Promise<CreatedUserModel> {
        const user = await this.findByEmail(email);
        const error = new CreatedUserModel();
        if (user.emailConfirmed !== true) {
            error.message = 'sorry, password not verified';

            return error;
        }
        if (forgotPassword.password === forgotPassword.repeatPassword) {
            const randomSalt: string = await this.hashHelper.getRandomSalt();
            user.salt = randomSalt;

            const pass: string = await this.hashHelper.getHash(forgotPassword.password, randomSalt);
            user.passwordHash = pass;

            const savedUser: User = await user.save();

            return savedUser;
        }
        error.message = 'Passwords do not match';

        return error;
    }

}
