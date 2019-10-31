import { Controller, Post, Body, Get, Put, Delete, Param, Query, Request } from '@nestjs/common';
import { ApiUseTags, ApiOperation } from '@nestjs/swagger';

import { UserService } from 'src/services';
import { CreateUserModel, UpdateUserModel, ForgotPassword, UserInfoModel } from 'src/models';
import { User } from 'src/entity';

@ApiUseTags('Users table')
@Controller('user')
export class UsersController {
    constructor(private userService: UserService) { }

    @Get(':id')
    @ApiOperation({ title: 'Search user by id' })
    public async get(@Param() params): Promise<User> {
        const user: User = await this.userService.getUserById(params.id);

        return user;
    }

    @Get()
    @ApiOperation({ title: 'Search all users' })
    public async getAll(): Promise<User[]> {
        const user: User[] = await this.userService.getUsers();

        return user;
    }

    @Get(':mail/:token')
    @ApiOperation({ title: 'Email confirmation' })
    public async validate(@Param('mail') mail: string, @Param('token') token: string): Promise<UserInfoModel> {
        const user: User = await this.userService.findByEmail(mail);
        const validate: UserInfoModel = await this.userService.validateToken(token, user);

        return validate;
    }

    @Post('create')
    @ApiOperation({ title: 'Create user' })
    public async create(@Request() req, @Body() user: CreateUserModel): Promise<UserInfoModel> {
        const createUser: UserInfoModel = await this.userService.createUser(user, req);

        return createUser;
    }

    @Post('forgotPassword')
    @ApiOperation({ title: 'Forgot password, enter email' })
    public async forgotPassword(@Request() req, @Body() forgotPassword: ForgotPassword): Promise<UserInfoModel> {
        const user: UserInfoModel = await this.userService.forgotPassword(forgotPassword, req);

        return user;
    }

    @Post('validateCode')
    @ApiOperation({ title: 'Forgot password, enter password' })
    public async validateForgotPassword(@Query('mail') mail: string, @Body() forgotPassword: ForgotPassword): Promise<UserInfoModel> {
        const user: UserInfoModel = await this.userService.validateForgotPassword(forgotPassword, mail);

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
    public async delete(@Param() params): Promise<number> {
        const deleted: number = await this.userService.deleteUser(params.id);

        return deleted;
    }
}
