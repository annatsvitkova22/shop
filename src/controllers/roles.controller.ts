import { Controller, Post, Body, Get, Put, Delete, Param} from '@nestjs/common';
import { RoleService } from 'src/services';
import { CreateRoleModel, UpdateRoleModel } from 'src/models';

@Controller('role')
export class RolesController {

    constructor(
        private roleService: RoleService,
        ) { }

    @Get(':id')
    get(@Param() params) {
        const role = this.roleService.getRoleById(params.id);

        return role;
    }

    @Get()
    getAll() {
        const role = this.roleService.getRoles();

        return role;
    }

    @Post()
    create(@Body() role: CreateRoleModel) {
        const createRole = this.roleService.createRole(role);

        return createRole;
    }

    @Put()
    update(@Body() role: UpdateRoleModel) {
        const updateRole = this.roleService.updateRole(role);

        return updateRole;
    }

    @Delete(':id')
    delete(@Param() params) {

        return this.roleService.deleteRole(params.id);
    }
}
