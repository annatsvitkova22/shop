import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiCreatedResponse } from '@nestjs/swagger';

import { CreateShopModel, UpdateShopModel } from 'src/models';

@ApiUseTags('requests')
@ApiBearerAuth()
@Controller('requests')
export class ControllersController {
    @Post()
    create(@Body() shop: CreateShopModel) {

        const shopElement: CreateShopModel = {};
        shopElement.age = shop.age;
        shopElement.breed = shop.breed;
        shopElement.name = shop.name;

        return shopElement;
    }

    @Get(':id')
    findOne(@Param('id') id: string) {

        return `This action returns a #${id} shop`;
    }

    @Put(':id')
    @ApiCreatedResponse({ description: 'The record has been successfully created.', type: UpdateShopModel })
    update(@Param('id') id: string, @Body() update: UpdateShopModel) {
        const updateElement: UpdateShopModel = {};
        updateElement.age = update.age;
        updateElement.breed = update.breed;
        updateElement.name = update.name;

        return updateElement;
    }

    @Delete(':id')
    remove(@Param('id') id: string) {

        return `This action removes a #${id} shop`;
    }

}
