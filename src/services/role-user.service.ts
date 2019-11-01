import { Injectable, Inject, forwardRef } from '@nestjs/common';

import { UserInRoles } from 'src/entity';
import { UpdateRoleInUsersModel, CreateRoleInUsersModel } from 'src/models';
import { UuidHelper } from 'src/common';
import { UserInRoleRepository } from 'src/repositories/user-role.repository';

@Injectable()
export class RoleInUsersService {

    constructor(
        private readonly roleInUsersRepository: UserInRoleRepository,
        @Inject(forwardRef(() => UuidHelper)) public uuidHelper: UuidHelper,
        ) { }

    public async getRoleInUsers(): Promise<UserInRoles[]> {
        const getRoleInUsers: UserInRoles[] = await this.roleInUsersRepository.getUserInRoles();

        return getRoleInUsers;
    }

    public async getRoleInUsersById(id: string): Promise<UserInRoles> {
        const foundRoleInUser: UserInRoles = await this.roleInUsersRepository.getUserInRoleById(id);

        return foundRoleInUser;
    }

    public async createRoleInUser(createRole: CreateRoleInUsersModel): Promise<UserInRoles> {
        const role: UserInRoles = new UserInRoles();
        role.roleId = createRole.roleId;
        role.userId = createRole.userId;
        role.id = this.uuidHelper.uuidv4();

        const savedRole: UserInRoles = await this.roleInUsersRepository.createUserInRole(role);

        return savedRole;
    }

    public async updateRoleInUser(updateRole: UpdateRoleInUsersModel): Promise<UserInRoles> {
        const roleInUser: UserInRoles = new UserInRoles();
        roleInUser.id = updateRole.id;
        roleInUser.roleId = updateRole.roleId;
        roleInUser.userId = updateRole.userId;

        const toUpdate: UserInRoles = await this.roleInUsersRepository.getUserInRoleById(roleInUser.id);
        toUpdate.roleId = roleInUser.roleId;
        toUpdate.userId = roleInUser.userId;

        const savedRoleInUser: UserInRoles = await this.roleInUsersRepository.createUserInRole(toUpdate);
        return savedRoleInUser;
      }

    public async deleteRole(roleId: string): Promise<number> {
        const result: number = await this.roleInUsersRepository.deleteUserInRole(roleId);

        return result;
    }
}
