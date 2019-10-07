import { Injectable } from '@nestjs/common';
import { UserInRoles } from 'src/entity';
import { UpdateRoleInUsersModel, CreateRoleInUsersModel } from 'src/models';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RoleInUsersService {

    constructor( @InjectRepository(UserInRoles) private roleInUsersRepository: Repository<UserInRoles>) { }

    async getRoleInUsers(): Promise<UserInRoles[]> {
        const getRoleInUsers = await this.roleInUsersRepository.find();
        return getRoleInUsers;
    }

    async getRoleInUsersById(id: number) {
        const RoleId: UpdateRoleInUsersModel = {};
        RoleId.id = id;
        const roleInUser = await this.roleInUsersRepository.find({
            select: ['roleId', 'userId'],
            where: [{ id: RoleId.id }],
        });
        return roleInUser;
    }

    async createRoleInUser(createRole: CreateRoleInUsersModel) {
        const getRole: UserInRoles = {} as UserInRoles;
        getRole.roleId = createRole.roleId;
        getRole.userId = createRole.userId;
        const role = await this.roleInUsersRepository.save(getRole);
        return(role.id);
    }

    async updateRoleInUser(updateRole: UpdateRoleInUsersModel): Promise<UserInRoles> {
        const getRoleInUser: UserInRoles = {} as UserInRoles;
        getRoleInUser.id = updateRole.id;
        getRoleInUser.roleId = updateRole.roleId;
        getRoleInUser.userId = updateRole.userId;
        const toUpdate = await this.roleInUsersRepository.findOne(getRoleInUser.id);
        delete toUpdate.roleId;
        delete toUpdate.userId;
        delete getRoleInUser.id;
        const updated = Object.assign(toUpdate, getRoleInUser);
        const roleInUser = await this.roleInUsersRepository.save(updated);
        return roleInUser;
      }

    async deleteRole(roleId: number) {
        const roleInUser: UserInRoles = {} as UserInRoles;
        roleInUser.id = roleId;
        const result = this.roleInUsersRepository.delete(roleInUser);
        return result;
    }
}
