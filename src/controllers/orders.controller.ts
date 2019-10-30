import { Controller, Post, Body, Get, Put, Delete, Param} from '@nestjs/common';
import { ApiUseTags, ApiOperation } from '@nestjs/swagger';

import { OrderService } from 'src/services';
import { CreateOrderModel, UpdateOrderModel } from 'src/models';
import { Order } from 'src/entity';

@ApiUseTags('Order')
@Controller('order')
export class OrdersController {

    constructor(
        private orderService: OrderService,
        ) { }

    @Get(':id')
    @ApiOperation({ title: 'Search order by id'})
    public async get(@Param() params): Promise<Order> {
        const order: Order = await this.orderService.getOrderById(params.id);

        return order;
    }

    @Get()
    @ApiOperation({ title: 'Search all orders'})
    public async getAll(): Promise<Order[]> {
        const order: Order[] = await this.orderService.getOrders();

        return order;
    }

    @Post()
    @ApiOperation({ title: 'Create order'})
    public async create(@Body() order: CreateOrderModel): Promise<Order> {
        const createOrder: Order = await this.orderService.createOrder(order);

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
    public async delete(@Param() params): Promise<number>  {
        const deleted: number  = await this.orderService.deleteOrder(params.id);

        return deleted;
    }
}
