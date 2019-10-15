import { Controller, Post, Body, Get, Put, Delete, Param} from '@nestjs/common';
import { ApiUseTags, ApiOperation } from '@nestjs/swagger';

import { OrderService } from 'src/services';
import { CreateOrderModel, UpdateOrderModel } from 'src/models';

@ApiUseTags('Orders table')
@Controller('order')
export class OrdersController {

    constructor(
        private orderService: OrderService,
        ) { }

    @Get(':id')
    @ApiOperation({ title: 'Search order by id'})
    get(@Param() params) {
        const order = this.orderService.getOrderById(params.id);

        return order;
    }

    @Get()
    @ApiOperation({ title: 'Search all orders'})
    getAll() {
        const order = this.orderService.getOrders();

        return order;
    }

    @Post()
    @ApiOperation({ title: 'Create order by id'})
    create(@Body() order: CreateOrderModel) {
        const createOrder = this.orderService.createOrder(order);

        return createOrder;
    }

    @Put()
    @ApiOperation({ title: 'Update order by id'})
    update(@Body() order: UpdateOrderModel) {
        const updateOrder = this.orderService.updateOrder(order);

        return updateOrder;
    }

    @Delete(':id')
    @ApiOperation({ title: 'Delete order by id'})
    delete(@Param() params) {

        return this.orderService.deleteOrder(params.id);
    }
}
