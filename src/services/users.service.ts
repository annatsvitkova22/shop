import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository, DeleteResult } from 'typeorm';

import { User } from 'src/entity';
import { UpdateUserModel, CreateUserModel } from 'src/models';
import { HashHelper } from 'src/common/hash.helper';

@Injectable()
export class UserService {
    public saltRounds = 10;
    constructor(
        public readonly hashHelper: HashHelper,
        @InjectRepository(User) private userRepository: Repository<User>,
        ) { }

    public async getUsers(): Promise<User[]> {
        const getUsers: User[] = await this.userRepository.find();

        return getUsers;
    }

    public async getUserById(id: number): Promise<User[]> {
        const user: UpdateUserModel = {};
        user.id = id;
        const foundUser: User[] = await this.userRepository.find({
            select: ['firstName', 'lastName', 'passwordHash', 'email'],
            where: [{ id: user.id }],
        });

        return foundUser;
    }

    public async createUser(createUser: CreateUserModel): Promise<User|string> {
        const user: User = {};
        user.firstName = createUser.firstName;
        user.lastName = createUser.lastName;
        user.email = createUser.email;

        const foundUser: User = await this.userRepository.findOne({ email: user.email });
        if (foundUser) {
            const message: string = 'user with this email already exists';

            return message;
        }

        const randomSalt: string = await this.hashHelper.getRandomSalt();
        user.salt = randomSalt;
        const pass: string = await this.hashHelper.getHash(createUser.passwordHash, randomSalt);
        user.passwordHash = pass;

        const savedUser: User = await this.userRepository.save(user);

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

    public async deleteUser(userId: number): Promise<DeleteResult> {
        const user: User = {} as User;
        user.id = userId;
        const result: Promise<DeleteResult> = this.userRepository.delete(user);

        return result;
    }

}
