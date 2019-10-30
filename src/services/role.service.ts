import { Injectable, Inject, forwardRef } from '@nestjs/common';

import { Role } from 'src/entity';
import { UpdateRoleModel, CreateRoleModel } from 'src/models';
import { UuidHelper } from 'src/common';
import { RoleRepository } from 'src/repositories/role.repository';

@Injectable()
export class RoleService {

    constructor(
        private readonly roleRepository: RoleRepository,
        @Inject(forwardRef(() => UuidHelper)) public uuidHelper: UuidHelper,
        ) { }

    public async getRoles(): Promise<Role[]> {
        const getRoles: Role[] = await this.roleRepository.getRoles();

        return getRoles;
    }

    public async getRoleById(id: string): Promise<Role> {
        const role = new UpdateRoleModel();
        role.id = id;
        const foundRole: Role = await this.roleRepository.getRoleById(role.id);

        return foundRole;
    }

    public async createRole(createRole: CreateRoleModel): Promise<Role> {
        const role = new Role();
        role.name = createRole.name;
        role.id = this.uuidHelper.uuidv4();

        const saveRole: Role = await this.roleRepository.createRole(role);

        return saveRole;
    }

    public async updateRole(updateRole: UpdateRoleModel): Promise<Role> {
        const role = new Role();
        role.id = updateRole.id;
        role.name = updateRole.name;

        const toUpdate: Role = await this.roleRepository.getRoleById(role.id);
        toUpdate.name = role.name;

        const savedRole: Role = await this.roleRepository.createRole(toUpdate);

        return savedRole;
      }

    public async deleteRole(roleId: string): Promise<number> {
        const deleted: number = await this.roleRepository.deleteRole(roleId);

        return deleted;
    }
}
