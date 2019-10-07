import { Injectable } from '@nestjs/common';
import { User } from 'src/entity';
import { UserRepository } from 'src/repositories/user.repository';
import { UpdateUserModel, CreateUserModel } from 'src/models';

@Injectable()
export class UserService {

    constructor( private userRepository: UserRepository) { }

    async getUsers(): Promise<User[]> {
        const getUsers = await this.userRepository.getUsers();
        return getUsers;
    }

    async getUserById(id: number) {
        const UserId: UpdateUserModel = {};
        UserId.id = id;
        const user = await this.userRepository.getUsersById(UserId);
        return user;
    }

    async createUser(createUser: CreateUserModel) {
        const getUser: User = {} as User;
        getUser.firstName = createUser.firstName;
        getUser.lastName = createUser.lastName;
        getUser.passwordHash = createUser.passwordHash;
        getUser.email = createUser.email;
        const user = await this.userRepository.createUser(getUser);
        return(user.id);
    }

    async updateUser(updateUser: UpdateUserModel): Promise<User> {
        const getUser: User = {} as User;
        getUser.id = updateUser.id;
        getUser.firstName = updateUser.firstName;
        getUser.lastName = updateUser.lastName;
        getUser.passwordHash = updateUser.passwordHash;
        getUser.email = updateUser.email;
        const toUpdate = await this.userRepository.getUserById(getUser);
        delete toUpdate.firstName;
        delete toUpdate.lastName;
        delete toUpdate.passwordHash;
        delete toUpdate.email;
        delete getUser.id;
        const updated = Object.assign(toUpdate, getUser);
        const user = await this.userRepository.createUser(updated);
        return user;
      }

    async deleteUser(userId: number) {
        const user: User = {} as User;
        user.id = userId;
        const result = this.userRepository.deleteUser(user);
        return result;
    }
}
