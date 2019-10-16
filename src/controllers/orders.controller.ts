import { Controller, Post, Body, Get, Put, Delete, Param} from '@nestjs/common';
import { ApiUseTags, ApiOperation } from '@nestjs/swagger';

import { DeleteResult } from 'typeorm';

import { OrderService } from 'src/services';
import { CreateOrderModel, UpdateOrderModel } from 'src/models';
import { Order } from 'src/entity';

@ApiUseTags('Orders table')
@Controller('order')
export class OrdersController {

    constructor(
        private orderService: OrderService,
        ) { }

    @Get(':id')
    @ApiOperation({ title: 'Search order by id'})
    public get(@Param() params): Promise<Order[]> {
        const order: Promise<Order[]> = this.orderService.getOrderById(params.id);

        return order;
    }

    @Get()
    @ApiOperation({ title: 'Search all orders'})
    public getAll(): Promise<Order[]> {
        const order: Promise<Order[]> = this.orderService.getOrders();

        return order;
    }

    @Post()
    @ApiOperation({ title: 'Create order by id'})
    public create(@Body() order: CreateOrderModel): Promise<number> {
        const createOrder: Promise<number> = this.orderService.createOrder(order);

        return createOrder;
    }

    @Put()
    @ApiOperation({ title: 'Update order by id'})
    public update(@Body() order: UpdateOrderModel): Promise<Order> {
        const updateOrder: Promise<Order> = this.orderService.updateOrder(order);

        return updateOrder;
    }

    @Delete(':id')
    @ApiOperation({ title: 'Delete order by id'})
    public delete(@Param() params): Promise<DeleteResult> {
        const deleted: Promise<DeleteResult> = this.orderService.deleteOrder(params.id);

        return deleted;
    }
}
