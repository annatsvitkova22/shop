import { Controller, Post, Body, Get, Put, Delete, Param, UseGuards } from '@nestjs/common';
import { ApiUseTags, ApiOperation } from '@nestjs/swagger';

import { RoleInUsersService } from 'src/services';
import { CreateRoleInUsersModel, UpdateRoleInUsersModel } from 'src/models';
import { UserInRoles } from 'src/entity';
import { Roles } from 'src/common';
import { AuthGuard } from '@nestjs/passport';

@ApiUseTags('Role in user')
@Controller('role-user')
export class RoleInUserController {

  constructor(private roleInUserService: RoleInUsersService) { }

  @Get()
  @ApiOperation({ title: 'Search all roles in users' })
  public async getAll(): Promise<UserInRoles[]> {
    const roleInUser: UserInRoles[] = await this.roleInUserService.getRoleInUsers();

    return roleInUser;
  }

  @Get(':id')
  @ApiOperation({ title: 'Search role in user by id' })
  public async get(@Param() params): Promise<UserInRoles> {
    const roleInUser: UserInRoles = await this.roleInUserService.getRoleInUsersById(params.id);

    return roleInUser;
  }

  @Post()
  @ApiOperation({ title: 'Create role in user' })
  public async create(@Body() createRoleInUser: CreateRoleInUsersModel): Promise<CreateRoleInUsersModel> {
    const roleInUser: CreateRoleInUsersModel = await this.roleInUserService.createRoleInUser(createRoleInUser);

    return roleInUser;
  }

  @UseGuards(AuthGuard('jwt'))
  @Put()
  @Roles('admin')
  @ApiOperation({ title: 'Update role in user by userId' })
  public update(@Body() updateRoleInUser: UpdateRoleInUsersModel): Promise<UserInRoles> {
    const roleInUser: Promise<UserInRoles> = this.roleInUserService.updateRoleInUser(updateRoleInUser);

    return roleInUser;
  }

  @Delete(':id')
  @ApiOperation({ title: 'Delete role in user by id' })
  public async delete(@Param() params): Promise<number> {
    const deleted: number = await this.roleInUserService.deleteRole(params.id);

    return deleted;
  }
}
