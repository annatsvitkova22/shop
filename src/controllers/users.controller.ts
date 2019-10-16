import { Controller, Post, Body, Get, Put, Delete, Param} from '@nestjs/common';
import { ApiUseTags, ApiOperation } from '@nestjs/swagger';

import { DeleteResult } from 'typeorm';

import { UserService } from 'src/services';
import { CreateUserModel, UpdateUserModel } from 'src/models';
import { User } from 'src/entity';

@ApiUseTags('Users table')
@Controller('user')
export class UsersController {
    constructor(
        private userService: UserService,
        ) { }

    @Get(':id')
    @ApiOperation({ title: 'Search user by id'})
    public async get(@Param() params): Promise<User[]> {
        const user: User[] = await this.userService.getUserById(params.id);

        return user;
    }

    @Get()
    @ApiOperation({ title: 'Search all users'})
    public async getAll(): Promise<User[]> {
        const user: User[] = await this.userService.getUsers();

        return user;
    }

    @Post()
    @ApiOperation({ title: 'Create user'})
    public async create(@Body() user: CreateUserModel): Promise<string|User> {
        const createUser: string|User = await this.userService.createUser(user);

        return createUser;
    }

    @Put()
    @ApiOperation({ title: 'Update user by id'})
    public async update(@Body() user: UpdateUserModel): Promise<User> {
        const updateUser: User = await this.userService.updateUser(user);

        return updateUser;
    }

    @Delete(':id')
    @ApiOperation({ title: 'Delete user by id'})
    public async delete(@Param() params): Promise<DeleteResult> {
        const deleted: DeleteResult = await this.userService.deleteUser(params.id);

        return deleted;
    }
}
