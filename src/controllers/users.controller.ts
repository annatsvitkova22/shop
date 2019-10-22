import { Controller, Post, Body, Get, Put, Delete, Param, Query, Request } from '@nestjs/common';
import { ApiUseTags, ApiOperation } from '@nestjs/swagger';

import { UserService } from 'src/services';
import { CreateUserModel, UpdateUserModel, ForgotPassword } from 'src/models';
import { User } from 'src/entity';

@ApiUseTags('Users table')
@Controller('user')
export class UsersController {
    constructor(private userService: UserService) { }

    @Get('id/:id')
    @ApiOperation({ title: 'Search user by id' })
    public async get(id: string): Promise<User> {
        const user: User = await this.userService.getUserById(id);

        return user;
    }

    @Get('all')
    @ApiOperation({ title: 'Search all users' })
    public async getAll(): Promise<User[]> {
        const user: User[] = await this.userService.getUsers();

        return user;
    }

    @Get('validateCode')
    @ApiOperation({ title: 'Email confirmation' })
    public async validate(@Query('mail') mail: string, @Query('token') token: string): Promise<string | boolean> {
        const user: User = await this.userService.findByEmail(mail);
        const validate = await this.userService.validateToken(token, user);

        return validate;
    }

    @Post('create')
    @ApiOperation({ title: 'Create user' })
    public async create(@Request() req, @Body() user: CreateUserModel): Promise<string | User> {
        const createUser: string | User = await this.userService.createUser(user, req);

        return createUser;
    }

    @Post('forgotPassword')
    @ApiOperation({ title: 'Forgot password, enter email' })
    public async forgotPassword(@Request() req, @Body() forgotPassword: ForgotPassword): Promise<string | User> {
        const user: string | User = await this.userService.forgotPassword(forgotPassword, req);

        return user;
    }

    @Post('validateCode')
    @ApiOperation({ title: 'Forgot password, enter password' })
    public async validateForgotPassword(@Query('mail') mail: string, @Body() forgotPassword: ForgotPassword): Promise<string | User> {
        const user: string | User = await this.userService.validateForgotPassword(forgotPassword, mail);

        return user;
    }

    @Put()
    @ApiOperation({ title: 'Update user by id' })
    public async update(@Body() user: UpdateUserModel): Promise<User> {
        const updateUser: User = await this.userService.updateUser(user);

        return updateUser;
    }

    @Delete(':id')
    @ApiOperation({ title: 'Delete user by id' })
    public async delete(@Param() params): Promise<boolean | string> {
        const deleted: boolean | string = await this.userService.deleteUser(params.id);

        return deleted;
    }
}
