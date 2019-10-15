import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository, DeleteResult } from 'typeorm';

import { Role } from 'src/entity';
import { UpdateRoleModel, CreateRoleModel } from 'src/models';

@Injectable()
export class RoleService {

    constructor( @InjectRepository(Role) private roleRepository: Repository<Role>) { }

    public async getRoles(): Promise<Role[]> {
        const getRoles = await this.roleRepository.find();

        return getRoles;
    }

    public async getRoleById(id: number): Promise<Role[]> {
        const role: UpdateRoleModel = {};
        role.id = id;
        const foundRole = await this.roleRepository.find({
            select: ['name'],
            where: [{ id: role.id }],
        });

        return foundRole;
    }

    public async createRole(createRole: CreateRoleModel): Promise<number> {
        const role: Role = {} as Role;
        role.name = createRole.name;
        const saveRole = await this.roleRepository.save(role);

        return(saveRole.id);
    }

    public async updateRole(updateRole: UpdateRoleModel): Promise<Role> {
        const role: Role = {};
        role.id = updateRole.id;
        role.name = updateRole.name;

        const toUpdate = await this.roleRepository.findOne(role.id);
        toUpdate.name = role.name;

        const savedRole = await this.roleRepository.save(toUpdate);

        return savedRole;
      }

    public async deleteRole(roleId: number): Promise<DeleteResult> {
        const role: Role = {} as Role;
        role.id = roleId;
        const result = this.roleRepository.delete(role);

        return result;
    }
}
