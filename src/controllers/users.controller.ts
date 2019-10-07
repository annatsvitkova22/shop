import { Controller, Post, Body, Get, Put, Delete, Param} from '@nestjs/common';
import { UserService } from 'src/services/users.service';
import { CreateUserModel, UpdateUserModel } from 'src/models';

@Controller('user')
export class UsersController {

    constructor(
        private userService: UserService,
        ) { }

    @Get(':id')
    get(@Param() params) {
        const user = this.userService.getUserById(params.id);
        return user;
    }

    @Get()
    getAll() {
    const user = this.userService.getUsers();
    return user;
  }

    @Post()
    create(@Body() user: CreateUserModel) {
        const createUser = this.userService.createUser(user);
        return createUser;
    }

    @Put()
    update(@Body() user: UpdateUserModel) {
        const updateUser = this.userService.updateUser(user);
        return updateUser;
    }

    @Delete(':id')
    delete(@Param() params) {
        return this.userService.deleteUser(params.id);
    }
}
