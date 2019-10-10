import { Injectable } from '@nestjs/common';
import { User } from 'src/entity';
import { UpdateUserModel, CreateUserModel } from 'src/models';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    public saltRounds = 10;
    constructor(@InjectRepository(User) private userRepository: Repository<User>) { }

    public async getRandomSalt(): Promise<string> {
        const randomSalt: string = await bcrypt.genSalt(this.saltRounds);

        return randomSalt;
    }

    public async getUsers(): Promise<User[]> {
        const getUsers = await this.userRepository.find();

        return getUsers;
    }

    public async getUserById(id: number): Promise<User[]> {
        const user: UpdateUserModel = {};
        user.id = id;
        const foundUser = await this.userRepository.find({
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

        const foundUser = await this.userRepository.findOne({ email: user.email });
        if (foundUser) {
            const message: string = 'user with this email already exists';

            return message;
        }

        const randomSalt = await this.getRandomSalt();
        user.salt = randomSalt;
        const pass = await this.getHash(createUser.passwordHash, randomSalt);
        user.passwordHash = pass;

        const savedUser = await this.userRepository.save(user);

        return savedUser;
    }

    public async updateUser(updateUser: UpdateUserModel): Promise<User> {
        const user: User = {};
        user.id = updateUser.id;
        user.firstName = updateUser.firstName;
        user.lastName = updateUser.lastName;
        user.passwordHash = updateUser.passwordHash;
        user.email = updateUser.email;

        const toUpdate = await this.userRepository.findOne(user.id);
        toUpdate.firstName = user.firstName;
        toUpdate.lastName = user.lastName;
        toUpdate.passwordHash = user.passwordHash;
        toUpdate.email = user.email;

        const savedUser = await this.userRepository.save(toUpdate);

        return savedUser;
    }

    public async deleteUser(userId: number): Promise<DeleteResult> {
        const user: User = {} as User;
        user.id = userId;
        const result = this.userRepository.delete(user);

        return result;
    }

    public async getHash(password: string, randomSalt: string): Promise<string> {
        const result = bcrypt.hash(password, randomSalt);

        return result;
    }
}
