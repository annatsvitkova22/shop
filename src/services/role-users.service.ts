import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository, DeleteResult } from 'typeorm';

import { UserInRoles } from 'src/entity';
import { UpdateRoleInUsersModel, CreateRoleInUsersModel } from 'src/models';

@Injectable()
export class RoleInUsersService {

    constructor( @InjectRepository(UserInRoles) private roleInUsersRepository: Repository<UserInRoles>) { }

    public async getRoleInUsers(): Promise<UserInRoles[]> {
        const getRoleInUsers = await this.roleInUsersRepository.find();

        return getRoleInUsers;
    }

    public async getRoleInUsersById(id: number): Promise<UserInRoles[]> {
        const role: UpdateRoleInUsersModel = {};
        role.id = id;
        const foundRoleInUser = await this.roleInUsersRepository.find({
            select: ['roleId', 'userId'],
            where: [{ id: role.id }],
        });

        return foundRoleInUser;
    }

    public async createRoleInUser(createRole: CreateRoleInUsersModel): Promise<number> {
        const role: UserInRoles = {} as UserInRoles;
        role.roleId = createRole.roleId;
        role.userId = createRole.userId;
        const savedRole = await this.roleInUsersRepository.save(role);

        return(savedRole.id);
    }

    public async updateRoleInUser(updateRole: UpdateRoleInUsersModel): Promise<UserInRoles> {
        const roleInUser: UserInRoles = {} as UserInRoles;
        roleInUser.id = updateRole.id;
        roleInUser.roleId = updateRole.roleId;
        roleInUser.userId = updateRole.userId;

        const toUpdate = await this.roleInUsersRepository.findOne(roleInUser.id);
        toUpdate.roleId = roleInUser.roleId;
        toUpdate.userId = roleInUser.userId;

        const savedRoleInUser = await this.roleInUsersRepository.save(toUpdate);

        return savedRoleInUser;
      }

    public async deleteRole(roleId: number): Promise<DeleteResult> {
        const roleInUser: UserInRoles = {} as UserInRoles;
        roleInUser.id = roleId;
        const result = this.roleInUsersRepository.delete(roleInUser);

        return result;
    }
}
