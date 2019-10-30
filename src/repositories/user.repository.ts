import { Injectable } from '@nestjs/common';
import { User } from 'src/entity';

const db = require('src/entity/user.entity');

@Injectable()
export class UserRepository {

    public async getUsers(): Promise<User[]> {
        const getUsers: User[] = await db.User.findAll();

        return getUsers;
    }

    public async getUserById(userId: string): Promise<User> {
        const user: User = await db.User.findOne({
            where: { id: userId },
        });

        return user;
    }

    public async getUserByEmail(userEmail: string): Promise<User> {
        const user: User = await db.User.findOne({
            where: { email: userEmail },
        });

        return user;
    }

    public async getUserWithRoleByEmail(username: string): Promise<User> {
        const user: User = await db.User.findOne({
            attributes: [`id`, `firstName`, `passwordHash`, `email`],
            where: { email: username },
        });

        return user;
    }

    public async createUser(createUser: User): Promise<User> {
        const user: User = await createUser.save();

        return user;
    }

    public async deleteUser(userId: string): Promise<number> {
        const deleted: number = await db.User.destroy({
            where: { id: userId },
        });

        return deleted;
    }
}
