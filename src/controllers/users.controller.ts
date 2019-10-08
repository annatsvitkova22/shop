import { Controller, Post, Body, Get, Put, Delete, Param} from '@nestjs/common';
import { UserService } from 'src/services';
import { CreateUserModel, UpdateUserModel } from 'src/models';

@Controller('user')
export class UsersController {
    constructor(
        private userService: UserService,
        ) { }

    @Get(':id')
    async get(@Param() params) {
        const user = await this.userService.getUserById(params.id);
        return user;
    }

    @Get()
    async getAll() {
        const user = await this.userService.getUsers();
        return user;
    }

    @Post()
    async create(@Body() user: CreateUserModel) {
        const createUser = await this.userService.createUser(user);
        return createUser;
    }

    @Put()
    async update(@Body() user: UpdateUserModel) {
        const updateUser = await this.userService.updateUser(user);
        return updateUser;
    }

    @Delete(':id')
    async delete(@Param() params) {
        await this.userService.deleteUser(params.id);
        return true;
    }
}
