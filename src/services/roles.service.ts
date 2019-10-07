import { Injectable } from '@nestjs/common';
import { Role } from 'src/entity';
import { RoleRepository } from 'src/repositories';
import { UpdateRoleModel, CreateRoleModel } from 'src/models';

@Injectable()
export class RoleService {

    constructor( private roleRepository: RoleRepository) { }

    async getRoles(): Promise<Role[]> {
        const getRoles = await this.roleRepository.getRoles();
        return getRoles;
    }

    async getRoleById(id: number) {
        const RoleId: UpdateRoleModel = {};
        RoleId.id = id;
        const role = await this.roleRepository.getRolesById(RoleId);
        return role;
    }

    async createRole(createRole: CreateRoleModel) {
        const getRole: Role = {} as Role;
        getRole.name = createRole.name;
        const role = await this.roleRepository.createRole(getRole);
        return(role.id);
    }

    async updateRole(updateRole: UpdateRoleModel): Promise<Role> {
        const getRole: Role = {} as Role;
        getRole.id = updateRole.id;
        getRole.name = updateRole.name;
        const toUpdate = await this.roleRepository.getRoleById(getRole);
        delete toUpdate.name;
        delete getRole.id;
        const updated = Object.assign(toUpdate, getRole);
        const role = await this.roleRepository.createRole(updated);
        return role;
      }

    async deleteRole(roleId: number) {
        const role: Role = {} as Role;
        role.id = roleId;
        const result = this.roleRepository.deleteRole(role);
        return result;
    }
}
