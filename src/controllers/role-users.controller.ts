import { Controller, Post, Body, Get, Put, Delete, Param} from '@nestjs/common';
import { RoleInUsersService } from 'src/services';
import { CreateRoleInUsersModel, UpdateRoleInUsersModel } from 'src/models';

@Controller('role-user')
export class RoleInUserController {

    constructor(
        private roleInUserService: RoleInUsersService,
        ) { }

    @Get(':id')
    get(@Param() params) {
        const roleInUser = this.roleInUserService.getRoleInUsersById(params.id);
        return roleInUser;
    }

    @Get()
    getAll() {
    const roleInUser = this.roleInUserService.getRoleInUsers();
    return roleInUser;
  }

    @Post()
    create(@Body() roleInUser: CreateRoleInUsersModel) {
        const createRoleInUser = this.roleInUserService.createRoleInUser(roleInUser);
        return createRoleInUser;
    }

    @Put()
    update(@Body() roleInUser: UpdateRoleInUsersModel) {
        const updateRoleInUser = this.roleInUserService.updateRoleInUser(roleInUser);
        return updateRoleInUser;
    }

    @Delete(':id')
    delete(@Param() params) {
        return this.roleInUserService.deleteRole(params.id);
    }
}
