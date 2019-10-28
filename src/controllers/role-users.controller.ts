import { Controller, Post, Body, Get, Put, Delete, Param} from '@nestjs/common';
import { ApiUseTags, ApiOperation } from '@nestjs/swagger';

import { RoleInUsersService } from 'src/services';
import { CreateRoleInUsersModel, UpdateRoleInUsersModel } from 'src/models';
import { UserInRoles } from 'src/entity';

@ApiUseTags('Role in user')
@Controller('role-user')
export class RoleInUserController {

    constructor(private roleInUserService: RoleInUsersService) { }

    @Get(':id')
    @ApiOperation({ title: 'Search role in user by id'})
    public async get(id: string): Promise<UserInRoles> {
        const roleInUser: UserInRoles = await this.roleInUserService.getRoleInUsersById(id);

        return roleInUser;
    }

    @Get()
    @ApiOperation({ title: 'Search all roles in users'})
    public async getAll(): Promise<UserInRoles[]> {
    const roleInUser: UserInRoles[] = await this.roleInUserService.getRoleInUsers();

    return roleInUser;
  }

    @Post()
    @ApiOperation({ title: 'Create role in user'})
    public async create(@Body() roleInUser: CreateRoleInUsersModel): Promise<UserInRoles> {
        const createRoleInUser: UserInRoles = await this.roleInUserService.createRoleInUser(roleInUser);

        return createRoleInUser;
    }

    @Put()
    @ApiOperation({ title: 'Update role in user by id'})
    public update(@Body() roleInUser: UpdateRoleInUsersModel): Promise<UserInRoles> {
        const updateRoleInUser: Promise<UserInRoles> = this.roleInUserService.updateRoleInUser(roleInUser);

        return updateRoleInUser;
    }

    @Delete(':id')
    @ApiOperation({ title: 'Delete role in user by id'})
    public async delete(@Param() params): Promise<number> {
        const deleted: number  = await this.roleInUserService.deleteRole(params.id);

        return deleted;
    }
}
