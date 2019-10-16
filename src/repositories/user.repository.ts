import { Injectable } from '@nestjs/common';
import { User } from 'src/entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';

@Injectable()
export class UserRepository {
    constructor(@InjectRepository(User) private userRepository: Repository<User>) { }

    public async createUser(createUser: User): Promise<User> {
        const user: User = await this.userRepository.save(createUser);

        return user;
    }

    public async getUsers(): Promise<User[]> {
        const getUsers: User[] = await this.userRepository.find();

        return getUsers;
    }

    public async getUsersById(userId: User): Promise<User[]> {
        const findUser: User[] = await this.userRepository.find({
            select: ['firstName', 'lastName', 'passwordHash', 'email'],
            where: [{ id: userId.id }],
        });

        return findUser;
    }

    public async getUserById(getUser: User): Promise<User> {
        const findUser: User = await this.userRepository.findOne(getUser.id);

        return findUser;
    }

    public async deleteUser(user: User): Promise<DeleteResult> {
        const result: Promise<DeleteResult> = this.userRepository.delete(user);

        return result;
    }
}
