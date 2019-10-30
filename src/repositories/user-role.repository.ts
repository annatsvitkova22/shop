import { Injectable } from '@nestjs/common';
import {  UserInRoles } from 'src/entity';

const db = require('src/entity/user-role.entity');

@Injectable()
export class UserInRoleRepository {

    public async getUserInRoles(): Promise<UserInRoles[]> {
        const getUserInRoles: UserInRoles[] = await db.UserInRoles.findAll();

        return getUserInRoles;
    }

    public async getUserInRoleById(userInRoleId: string): Promise<UserInRoles> {
        const userInRole: UserInRoles = await db.UserInRoles.findOne({
            where: { id: userInRoleId },
        });

        return userInRole;
    }

    public async createUserInRole(createUserInRole: UserInRoles): Promise<UserInRoles> {
        const userInRole: UserInRoles = await createUserInRole.save();

        return userInRole;
    }

    public async deleteUserInRole(userInRoleId: string): Promise<number> {
        const deleted: number = await db.UserInRoles.destroy({
            where: { id: userInRoleId },
        });

        return deleted;
    }
}
