import { Injectable } from '@nestjs/common';
import { User } from 'src/entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepository {
    constructor(@InjectRepository(User) private userRepository: Repository<User>) { }

    public async createUser(createUser: User) {
        const user = await this.userRepository.save(createUser);
        return user;
    }

    public async getUsers() {
        const getUsers = await this.userRepository.find();
        return getUsers;
    }

    public async getUsersById(userId: User) {
        const findUser = await this.userRepository.find({
            select: ['firstName', 'lastName', 'passwordHash', 'email'],
            where: [{ id: userId.id }],
        });
        return findUser;
    }

    public async getUserById(getUser: User) {
        const findUser = await this.userRepository.findOne(getUser.id);
        return findUser;
    }

    public async deleteUser(user: User) {
        const result = this.userRepository.delete(user);
        return result;
    }
}
