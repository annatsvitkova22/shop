import { Injectable, Inject, forwardRef } from '@nestjs/common';

import { UserInRoles } from 'src/entity';
import { UpdateRoleInUsersModel, CreateRoleInUsersModel } from 'src/models';
import { UuidHelper } from 'src/common';

@Injectable()
export class RoleInUsersService {

    constructor(
        @Inject('UserInRolesRepository') private readonly roleInUsersRepository: typeof UserInRoles,
        @Inject(forwardRef(() => UuidHelper)) public uuidHelper: UuidHelper,
        ) { }

    public async getRoleInUsers(): Promise<UserInRoles[]> {
        const getRoleInUsers: UserInRoles[] = await this.roleInUsersRepository.findAll();

        return getRoleInUsers;
    }

    public async getRoleInUsersById(id: string): Promise<UserInRoles> {
        const role = new UpdateRoleInUsersModel();
        role.id = id;
        const foundRoleInUser: UserInRoles = await this.roleInUsersRepository.findOne({
            where: {id: role.id},
          });

        return foundRoleInUser;
    }

    public async createRoleInUser(createRole: CreateRoleInUsersModel): Promise<UserInRoles> {
        const role = new UserInRoles();
        role.roleId = createRole.roleId;
        role.userId = createRole.userId;
        role.id = this.uuidHelper.uuidv4();

        const savedRole: UserInRoles = await role.save();

        return savedRole;
    }

    public async updateRoleInUser(updateRole: UpdateRoleInUsersModel): Promise<UserInRoles> {
        const roleInUser = new UserInRoles();
        roleInUser.id = updateRole.id;
        roleInUser.roleId = updateRole.roleId;
        roleInUser.userId = updateRole.userId;

        const toUpdate: UserInRoles = await this.getRoleInUsersById(roleInUser.id);
        toUpdate.roleId = roleInUser.roleId;
        toUpdate.userId = roleInUser.userId;

        const savedRoleInUser: UserInRoles = await toUpdate.save();
        return savedRoleInUser;
      }

    public async deleteRole(roleId: string): Promise<number> {
        const result: number = await this.roleInUsersRepository.destroy({
            where: { id: roleId },
          });

        return result;
    }
}
