import { Injectable, Inject, forwardRef } from '@nestjs/common';

import { Role } from 'src/entity';
import { UpdateRoleModel, CreateRoleModel } from 'src/models';
import { UuidHelper } from 'src/common';

@Injectable()
export class RoleService {

    constructor(
        @Inject('RoleRepository') private readonly roleRepository: typeof Role,
        @Inject(forwardRef(() => UuidHelper)) public uuidHelper: UuidHelper,
        ) { }

    public async getRoles(): Promise<Role[]> {
        const getRoles: Role[] = await this.roleRepository.findAll();

        return getRoles;
    }

    public async getRoleById(id: string): Promise<Role> {
        const role = new UpdateRoleModel();
        role.id = id;
        const foundRole: Role = await this.roleRepository.findOne({
            where: {id: role.id},
          });

        return foundRole;
    }

    public async createRole(createRole: CreateRoleModel): Promise<Role> {
        const role = new Role();
        role.name = createRole.name;
        role.id = this.uuidHelper.uuidv4();

        const saveRole: Role = await role.save();

        return saveRole;
    }

    public async updateRole(updateRole: UpdateRoleModel): Promise<Role> {
        const role = new Role();
        role.id = updateRole.id;
        role.name = updateRole.name;

        const toUpdate: Role = await this.getRoleById(role.id);
        toUpdate.name = role.name;

        const savedRole: Role = await toUpdate.save();

        return savedRole;
      }

    public async deleteRole(roleId: string): Promise<number> {
        const result: number = await this.roleRepository.destroy({
            where: { id: roleId },
          });

        return result;
    }
}
