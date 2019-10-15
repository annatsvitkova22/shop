import { Controller, Post, Body, Get, Put, Delete, Param} from '@nestjs/common';
import { ApiUseTags, ApiOperation } from '@nestjs/swagger';

import { UserService } from 'src/services';
import { CreateUserModel, UpdateUserModel } from 'src/models';

@ApiUseTags('Users table')
@Controller('user')
export class UsersController {
    constructor(
        private userService: UserService,
        ) { }

    @Get(':id')
    @ApiOperation({ title: 'Search user by id'})
    public async get(@Param() params) {
        const user = await this.userService.getUserById(params.id);

        return user;
    }

    @Get()
    @ApiOperation({ title: 'Search all users'})
    public async getAll() {
        const user = await this.userService.getUsers();

        return user;
    }

    @Post()
    @ApiOperation({ title: 'Create user'})
    public async create(@Body() user: CreateUserModel) {
        const createUser = await this.userService.createUser(user);

        return createUser;
    }

    @Put()
    @ApiOperation({ title: 'Update user by id'})
    public async update(@Body() user: UpdateUserModel) {
        const updateUser = await this.userService.updateUser(user);

        return updateUser;
    }

    @Delete(':id')
    @ApiOperation({ title: 'Delete user by id'})
    public async delete(@Param() params) {
        await this.userService.deleteUser(params.id);

        return true;
    }
}
