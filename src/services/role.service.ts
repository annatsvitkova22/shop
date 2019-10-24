import { Injectable, Inject } from '@nestjs/common';

import { Role } from 'src/entity';
import { UpdateRoleModel, CreateRoleModel } from 'src/models';

@Injectable()
export class RoleService {

    constructor( @Inject('RoleRepository') private readonly roleRepository: typeof Role) { }

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

    public async createRole(createRole: CreateRoleModel): Promise<string> {
        const role: Role = {} as Role;
        role.name = createRole.name;
        const saveRole: Role = await this.roleRepository.create<Role>(role);

        return(saveRole.id);
    }

    // public async updateRole(updateRole: UpdateRoleModel): Promise<Role> {
    //     const role: Role = {};
    //     role.id = updateRole.id;
    //     role.name = updateRole.name;

    //     const toUpdate: Role = await this.roleRepository.findOne(role.id);
    //     toUpdate.name = role.name;

    //     const savedRole: Role = await this.roleRepository.save(toUpdate);

    //     return savedRole;
    //   }

    public async deleteRole(roleId: string): Promise<number> {
        const result: number = await this.roleRepository.destroy({
            where: { id: roleId },
          });

        return result;
    }
}
