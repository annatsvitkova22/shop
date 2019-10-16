import { Controller, Post, Body, Get, Put, Delete, Param} from '@nestjs/common';
import { ApiUseTags, ApiOperation } from '@nestjs/swagger';

import { DeleteResult } from 'typeorm';

import { OrderItemService } from 'src/services';
import { CreateOrderItemModel, UpdateOrderItemModel } from 'src/models';
import { OrderItem } from 'src/entity';

@ApiUseTags('Order Items table')
@Controller('orderItem')
export class OrderItemsController {

    constructor(
        private orderItemService: OrderItemService,
        ) { }

    @Get(':id')
    @ApiOperation({ title: 'Search order item by id'})
    public get(@Param() params): Promise<OrderItem[]> {
        const orderItem: Promise<OrderItem[]> = this.orderItemService.getOrderItemById(params.id);

        return orderItem;
    }

    @Get()
    @ApiOperation({ title: 'Search all order items'})
    public getAll(): Promise<OrderItem[]> {
        const orderItem: Promise<OrderItem[]> = this.orderItemService.getOrderItems();

        return orderItem;
    }

    @Post()
    @ApiOperation({ title: 'Create order item'})
    public create(@Body() orderItem: CreateOrderItemModel): Promise<number> {
        const createOrderItem: Promise<number> = this.orderItemService.createOrderItem(orderItem);

        return createOrderItem;
    }

    @Put()
    @ApiOperation({ title: 'Update order item by id'})
    public update(@Body() orderItem: UpdateOrderItemModel): Promise<OrderItem> {
        const updateOrderItem: Promise<OrderItem> = this.orderItemService.updateOrderItem(orderItem);

        return updateOrderItem;
    }

    @Delete(':id')
    @ApiOperation({ title: 'Delete order item by id'})
    public delete(@Param() params): Promise<DeleteResult> {
        const deleted: Promise<DeleteResult> = this.orderItemService.deleteOrderItem(params.id);

        return deleted;
    }
}
