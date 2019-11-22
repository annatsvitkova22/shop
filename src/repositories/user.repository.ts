import { Injectable } from '@nestjs/common';
import { User } from 'src/entity';
import sequelize = require('sequelize');
import { UserWithRoleModel } from 'src/models';

import db = require('src/entity/user.entity');

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

    public async getUserWithRoleByEmail(query: string): Promise<UserWithRoleModel[]> {
        const user: UserWithRoleModel[] = await db.User.sequelize.query(query, {
            plain: false,
            raw: false,
            type: sequelize.QueryTypes.SELECT,
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
