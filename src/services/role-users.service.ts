import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository, DeleteResult } from 'typeorm';

import { UserInRoles } from 'src/entity';
import { UpdateRoleInUsersModel, CreateRoleInUsersModel } from 'src/models';

@Injectable()
export class RoleInUsersService {

    constructor( @InjectRepository(UserInRoles) private roleInUsersRepository: Repository<UserInRoles>) { }

    public async getRoleInUsers(): Promise<UserInRoles[]> {
        const getRoleInUsers: UserInRoles[] = await this.roleInUsersRepository.find();

        return getRoleInUsers;
    }

    public async getRoleInUsersById(id: string): Promise<UserInRoles> {
        const role: UpdateRoleInUsersModel = {};
        role.id = id;
        const foundRoleInUser: UserInRoles = await this.roleInUsersRepository.findOne(role.id);

        return foundRoleInUser;
    }

    public async createRoleInUser(createRole: CreateRoleInUsersModel): Promise<string> {
        const role: UserInRoles = {} as UserInRoles;
        role.roleId = createRole.roleId;
        role.userId = createRole.userId;
        const savedRole: UserInRoles = await this.roleInUsersRepository.save(role);

        return(savedRole.id);
    }

    public async updateRoleInUser(updateRole: UpdateRoleInUsersModel): Promise<UserInRoles> {
        const roleInUser: UserInRoles = {} as UserInRoles;
        roleInUser.id = updateRole.id;
        roleInUser.roleId = updateRole.roleId;
        roleInUser.userId = updateRole.userId;

        const toUpdate: UserInRoles = await this.roleInUsersRepository.findOne(roleInUser.id);
        toUpdate.roleId = roleInUser.roleId;
        toUpdate.userId = roleInUser.userId;

        const savedRoleInUser: UserInRoles = await this.roleInUsersRepository.save(toUpdate);

        return savedRoleInUser;
      }

    public async deleteRole(roleId: string): Promise<boolean|string> {
        const roleInUser: UserInRoles = {} as UserInRoles;
        roleInUser.id = roleId;
        const result: DeleteResult = await this.roleInUsersRepository.delete(roleInUser);
        if (result.affected === 0) {
            const messege: string = 'id not found';

            return messege;
        }

        return true;
    }
}
