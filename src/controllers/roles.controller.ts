import { Controller, Post, Body, Get, Put, Delete, Param} from '@nestjs/common';
import { ApiUseTags, ApiOperation } from '@nestjs/swagger';

import { RoleService } from 'src/services';
import { CreateRoleModel, UpdateRoleModel } from 'src/models';
import { Role } from 'src/entity';

@ApiUseTags('Role')
@Controller('role')
export class RolesController {

    constructor(private roleService: RoleService) { }

    @Get(':id')
    @ApiOperation({ title: 'Search role by id'})
    public async get(id: string): Promise<Role> {
        const role: Role = await this.roleService.getRoleById(id);

        return role;
    }

    @Get()
    @ApiOperation({ title: 'Search all roles'})
    public async getAll(): Promise<Role[]> {
        const role: Role[] = await this.roleService.getRoles();

        return role;
    }

    @Post()
    @ApiOperation({ title: 'Creste user'})
    public async create(@Body() role: CreateRoleModel): Promise<string> {
        const createRole: string = await this.roleService.createRole(role);

        return createRole;
    }

    // @Put()
    // @ApiOperation({ title: 'Update user by id'})
    // public update(@Body() role: UpdateRoleModel): Promise<Role> {
    //     const updateRole: Promise<Role> = this.roleService.updateRole(role);

    //     return updateRole;
    // }

    @Delete(':id')
    @ApiOperation({ title: 'Delete user by id'})
    public async delete(@Param() params): Promise<number> {
        const deleted: number = await this.roleService.deleteRole(params.id);

        return deleted;
    }
}
