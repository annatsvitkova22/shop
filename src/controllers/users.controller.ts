import { Controller, Post, Body, Get, Put, Delete, Param, Request, UseGuards } from '@nestjs/common';
import { ApiUseTags, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/common';

import { UserService } from 'src/services';
import { CreateUserModel, UpdateUserModel, ForgotPassword, UserInfoModel } from 'src/models';
import { User } from 'src/entity';

@ApiUseTags('Users table')
@Controller('user')
export class UsersController {
    constructor(private userService: UserService) { }

    @UseGuards(AuthGuard('jwt'))
    @Get()
    @Roles('admin')
    @ApiOperation({ title: 'Search all users' })
    public async getAll(): Promise<User[]> {
        const user: User[] = await this.userService.getUsers();

        return user;
    }

    @UseGuards(AuthGuard('jwt'))
    @Get(':id')
    @Roles('admin')
    @ApiOperation({ title: 'Search user by id' })
    public async get(@Param() params): Promise<CreateUserModel> {
        const user: CreateUserModel = await this.userService.getUserById(params.id);

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
    public async create(@Request() req, @Body() createUser: CreateUserModel): Promise<UserInfoModel> {
        const user: UserInfoModel = await this.userService.createUser(createUser, req);

        return user;
    }

    @Post('forgotPassword')
    @ApiOperation({ title: 'Forgot password, enter email' })
    public async forgotPassword(@Body() forgotPassword: ForgotPassword): Promise<UserInfoModel> {
        const user: UserInfoModel = await this.userService.forgotPassword(forgotPassword);

        return user;
    }

    @UseGuards(AuthGuard('jwt'))
    @Put()
    @Roles('admin')
    @ApiOperation({ title: 'Update user by id' })
    public async update(@Body() updateUser: UpdateUserModel): Promise<User> {
        const user: User = await this.userService.updateUser(updateUser);

        return user;
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    @Roles('admin')
    @ApiOperation({ title: 'Delete user by id' })
    public async delete(@Param() params): Promise<number> {
        const deleted: number = await this.userService.deleteUser(params.id);

        return deleted;
    }
}
