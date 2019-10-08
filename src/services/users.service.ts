import { Injectable } from '@nestjs/common';
import { User } from 'src/entity';
import { UpdateUserModel, CreateUserModel } from 'src/models';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    private saltRounds = 10;
    constructor( @InjectRepository(User) private userRepository: Repository<User>) { }

    async getUsers(): Promise<User[]> {
        const getUsers = await this.userRepository.find();
        return getUsers;
    }

    async getUserById(id: number) {
        const UserId: UpdateUserModel = {};
        UserId.id = id;
        const user = await this.userRepository.find({
            select: ['firstName', 'lastName', 'passwordHash', 'email'],
            where: [{ id: UserId.id }],
        });
        return user;
    }

    async createUser(createUser: CreateUserModel) {
        const getUser: User = {} as User;
        getUser.firstName = createUser.firstName;
        getUser.lastName = createUser.lastName;
        getUser.email = createUser.email;
        getUser.passwordHash = await this.getHash(createUser.passwordHash);
        let user = await this.userRepository.findOne({ email: getUser.email });
        if (user) {
            const message: string = 'user with this email already exists';
            return message;
        }
        user = await this.userRepository.save(getUser);
        return(user.id);
    }

    async updateUser(updateUser: UpdateUserModel): Promise<User> {
        const getUser: User = {} as User;
        getUser.id = updateUser.id;
        getUser.firstName = updateUser.firstName;
        getUser.lastName = updateUser.lastName;
        getUser.passwordHash = updateUser.passwordHash;
        getUser.email = updateUser.email;
        const toUpdate = await this.userRepository.findOne(getUser.id);
        delete toUpdate.firstName;
        delete toUpdate.lastName;
        delete toUpdate.passwordHash;
        delete toUpdate.email;
        delete getUser.id;
        const updated = Object.assign(toUpdate, getUser);
        const user = await this.userRepository.save(updated);
        return user;
      }

    async deleteUser(userId: number) {
        const user: User = {} as User;
        user.id = userId;
        const result = this.userRepository.delete(user);
        return result;
    }

    async getHash(password: string|undefined): Promise<string> {
        return bcrypt.hash(password, this.saltRounds);
    }

    // async compareHash(password: string|undefined, hash: string|undefined): Promise<boolean> {
    //     return bcrypt.compare(password, hash);
    //   }
}
