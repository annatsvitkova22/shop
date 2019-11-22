import { Controller, Post, Body, Get, Put, Delete, Param, UseGuards} from '@nestjs/common';
import { ApiUseTags, ApiOperation } from '@nestjs/swagger';
import { Roles } from 'src/common';
import { AuthGuard } from '@nestjs/passport';

import { RoleService } from 'src/services';
import { CreateRoleModel, UpdateRoleModel } from 'src/models';
import { Role } from 'src/entity';

@ApiUseTags('Role')
@Controller('role')
export class RolesController {

    constructor(private roleService: RoleService) { }

    @UseGuards(AuthGuard('jwt'))
    @Get()
    @Roles('admin')
    @ApiOperation({ title: 'Search all roles'})
    public async getAll(): Promise<Role[]> {
        const role: Role[] = await this.roleService.getRoles();

        return role;
    }

    @UseGuards(AuthGuard('jwt'))
    @Get(':id')
    @Roles('admin')
    @ApiOperation({ title: 'Search role by id'})
    public async get(@Param() param): Promise<Role> {
        const role: Role = await this.roleService.getRoleById(param.id);

        return role;
    }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    @Roles('admin')
    @ApiOperation({ title: 'Creste user'})
    public async create(@Body() createdRole: CreateRoleModel): Promise<Role> {
        const role: Role = await this.roleService.createRole(createdRole);

        return role;
    }

    @UseGuards(AuthGuard('jwt'))
    @Put()
    @Roles('admin')
    @ApiOperation({ title: 'Update user by id'})
    public update(@Body() updatedRole: UpdateRoleModel): Promise<Role> {
        const role: Promise<Role> = this.roleService.updateRole(updatedRole);

        return role;
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    @Roles('admin')
    @ApiOperation({ title: 'Delete user by id'})
    public async delete(@Param() params): Promise<number> {
        const deleted: number = await this.roleService.deleteRole(params.id);

        return deleted;
    }
}
