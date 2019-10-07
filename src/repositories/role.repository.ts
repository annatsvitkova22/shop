import { Injectable } from '@nestjs/common';
import { Role } from 'src/entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RoleRepository {
    constructor(@InjectRepository(Role) private roleRepository: Repository<Role>) { }

    public async createRole(createRole: Role) {
        const role = await this.roleRepository.save(createRole);
        return role;
    }

    public async getRoles() {
        const getRoles = await this.roleRepository.find();
        return getRoles;
    }

    public async getRolesById(roleId: Role) {
        const findRole = await this.roleRepository.find({
            select: ['name'],
            where: [{ id: roleId.id }],
        });
        return findRole;
    }

    public async getRoleById(getRole: Role) {
        const findRole = await this.roleRepository.findOne(getRole.id);
        return findRole;
    }

    public async deleteRole(role: Role) {
        const result = this.roleRepository.delete(role);
        return result;
    }
}
