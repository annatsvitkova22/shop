import { Controller, Post, Body, Get, Put, Delete, Param} from '@nestjs/common';
import { ApiUseTags, ApiOperation } from '@nestjs/swagger';

import { RoleInUsersService } from 'src/services';
import { CreateRoleInUsersModel, UpdateRoleInUsersModel } from 'src/models';

@ApiUseTags('Role in users table')
@Controller('role-user')
export class RoleInUserController {

    constructor(
        private roleInUserService: RoleInUsersService,
        ) { }

    @Get(':id')
    @ApiOperation({ title: 'Search role in user by id'})
    get(@Param() params) {
        const roleInUser = this.roleInUserService.getRoleInUsersById(params.id);

        return roleInUser;
    }

    @Get()
    @ApiOperation({ title: 'Search all roles in users'})
    getAll() {
    const roleInUser = this.roleInUserService.getRoleInUsers();

    return roleInUser;
  }

    @Post()
    @ApiOperation({ title: 'Create role in user'})
    create(@Body() roleInUser: CreateRoleInUsersModel) {
        const createRoleInUser = this.roleInUserService.createRoleInUser(roleInUser);

        return createRoleInUser;
    }

    @Put()
    @ApiOperation({ title: 'Update role in user by id'})
    update(@Body() roleInUser: UpdateRoleInUsersModel) {
        const updateRoleInUser = this.roleInUserService.updateRoleInUser(roleInUser);

        return updateRoleInUser;
    }

    @Delete(':id')
    @ApiOperation({ title: 'Delete role in user by id'})
    delete(@Param() params) {

        return this.roleInUserService.deleteRole(params.id);
    }
}
