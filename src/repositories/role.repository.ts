import { Injectable } from '@nestjs/common';
import { Role } from 'src/entity';

const db = require('src/entity/role.entity');

@Injectable()
export class RoleRepository {

    public async getRoles(): Promise<Role[]> {
        const getRoles: Role[] = await db.Role.findAll();

        return getRoles;
    }

    public async getRoleById(roleId: string): Promise<Role> {
        const role: Role = await db.Role.findOne({
            where: { id: roleId },
        });

        return role;
    }

    public async createRole(createRole: Role): Promise<Role> {
        const role: Role = await createRole.save();

        return role;
    }

    public async deleteRole(roleId: string): Promise<number> {
        const deleted: number = await db.Role.destroy({
            where: { id: roleId },
        });

        return deleted;
    }
}
