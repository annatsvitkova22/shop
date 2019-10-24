import { Controller, Post, Body, Get, Put, Delete, Param} from '@nestjs/common';
import { ApiUseTags, ApiOperation } from '@nestjs/swagger';

import { RoleInUsersService } from 'src/services';
import { CreateRoleInUsersModel, UpdateRoleInUsersModel } from 'src/models';
import { UserInRoles } from 'src/entity';

@ApiUseTags('Role in user')
@Controller('role-user')
export class RoleInUserController {

    constructor(private roleInUserService: RoleInUsersService) { }

    // @Get(':id')
    // @ApiOperation({ title: 'Search role in user by id'})
    // public get(id: string): Promise<UserInRoles> {
    //     const roleInUser: Promise<UserInRoles> = this.roleInUserService.getRoleInUsersById(id);

    //     return roleInUser;
    // }

    @Get()
    @ApiOperation({ title: 'Search all roles in users'})
    public getAll(): Promise<UserInRoles[]> {
    const roleInUser: Promise<UserInRoles[]> = this.roleInUserService.getRoleInUsers();

    return roleInUser;
  }

    @Post()
    @ApiOperation({ title: 'Create role in user'})
    public create(@Body() roleInUser: CreateRoleInUsersModel): Promise<string> {
        const createRoleInUser: Promise<string> = this.roleInUserService.createRoleInUser(roleInUser);

        return createRoleInUser;
    }

    // @Put()
    // @ApiOperation({ title: 'Update role in user by id'})
    // public update(@Body() roleInUser: UpdateRoleInUsersModel): Promise<UserInRoles> {
    //     const updateRoleInUser: Promise<UserInRoles> = this.roleInUserService.updateRoleInUser(roleInUser);

    //     return updateRoleInUser;
    // }

    // @Delete(':id')
    // @ApiOperation({ title: 'Delete role in user by id'})
    // public delete(@Param() params): Promise<boolean|string> {
    //     const deleted: Promise<boolean|string>  = this.roleInUserService.deleteRole(params.id);

    //     return deleted;
    // }
}
