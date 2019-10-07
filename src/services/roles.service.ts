import { Injectable } from '@nestjs/common';
import { Role } from 'src/entity';
import { UpdateRoleModel, CreateRoleModel } from 'src/models';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RoleService {

    constructor( @InjectRepository(Role) private roleRepository: Repository<Role>) { }

    async getRoles(): Promise<Role[]> {
        const getRoles = await this.roleRepository.find();
        return getRoles;
    }

    async getRoleById(id: number) {
        const RoleId: UpdateRoleModel = {};
        RoleId.id = id;
        const role = await this.roleRepository.find({
            select: ['name'],
            where: [{ id: RoleId.id }],
        });
        return role;
    }

    async createRole(createRole: CreateRoleModel) {
        const getRole: Role = {} as Role;
        getRole.name = createRole.name;
        const role = await this.roleRepository.save(getRole);
        return(role.id);
    }

    async updateRole(updateRole: UpdateRoleModel): Promise<Role> {
        const getRole: Role = {} as Role;
        getRole.id = updateRole.id;
        getRole.name = updateRole.name;
        const toUpdate = await this.roleRepository.findOne(getRole.id);
        delete toUpdate.name;
        delete getRole.id;
        const updated = Object.assign(toUpdate, getRole);
        const role = await this.roleRepository.save(updated);
        return role;
      }

    async deleteRole(roleId: number) {
        const role: Role = {} as Role;
        role.id = roleId;
        const result = this.roleRepository.delete(role);
        return result;
    }
}
