import { Controller, Post, Body, Get, Put, Delete, Param} from '@nestjs/common';
import { ApiUseTags, ApiOperation } from '@nestjs/swagger';

import { RoleService } from 'src/services';
import { CreateRoleModel, UpdateRoleModel } from 'src/models';

@ApiUseTags('Roles table')
@Controller('role')
export class RolesController {

    constructor(
        private roleService: RoleService,
        ) { }

    @Get(':id')
    @ApiOperation({ title: 'Search role by id'})
    get(@Param() params) {
        const role = this.roleService.getRoleById(params.id);

        return role;
    }

    @Get()
    @ApiOperation({ title: 'Search all roles'})
    getAll() {
        const role = this.roleService.getRoles();

        return role;
    }

    @Post()
    @ApiOperation({ title: 'Creste user'})
    create(@Body() role: CreateRoleModel) {
        const createRole = this.roleService.createRole(role);

        return createRole;
    }

    @Put()
    @ApiOperation({ title: 'Update user by id'})
    update(@Body() role: UpdateRoleModel) {
        const updateRole = this.roleService.updateRole(role);

        return updateRole;
    }

    @Delete(':id')
    @ApiOperation({ title: 'Delete user by id'})
    delete(@Param() params) {

        return this.roleService.deleteRole(params.id);
    }
}
