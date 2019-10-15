import { Controller, Post, Body, Get, Put, Delete, Param} from '@nestjs/common';
import { ApiUseTags, ApiOperation } from '@nestjs/swagger';

import { OrderItemService } from 'src/services';
import { CreateOrderItemModel, UpdateOrderItemModel } from 'src/models';

@ApiUseTags('Order Items table')
@Controller('orderItem')
export class OrderItemsController {

    constructor(
        private orderItemService: OrderItemService,
        ) { }

    @Get(':id')
    @ApiOperation({ title: 'Search order item by id'})
    get(@Param() params) {
        const orderItem = this.orderItemService.getOrderItemById(params.id);

        return orderItem;
    }

    @Get()
    @ApiOperation({ title: 'Search all order items'})
    getAll() {
        const orderItem = this.orderItemService.getOrderItems();

        return orderItem;
    }

    @Post()
    @ApiOperation({ title: 'Create order item'})
    create(@Body() orderItem: CreateOrderItemModel) {
        const createOrderItem = this.orderItemService.createOrderItem(orderItem);

        return createOrderItem;
    }

    @Put()
    @ApiOperation({ title: 'Update order item by id'})
    update(@Body() orderItem: UpdateOrderItemModel) {
        const updateOrderItem = this.orderItemService.updateOrderItem(orderItem);

        return updateOrderItem;
    }

    @Delete(':id')
    @ApiOperation({ title: 'Delete order item by id'})
    delete(@Param() params) {

        return this.orderItemService.deleteOrderItem(params.id);
    }
}
