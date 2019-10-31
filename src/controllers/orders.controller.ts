import { Controller, Post, Body, Get, Put, Delete, Param} from '@nestjs/common';
import { ApiUseTags, ApiOperation } from '@nestjs/swagger';

import { OrderService } from 'src/services';
import { CreateOrderModel, UpdateOrderModel } from 'src/models';
import { Order } from 'src/entity';

@ApiUseTags('Order')
@Controller('order')
export class OrdersController {

    constructor( private orderService: OrderService, ) { }

    @Get()
    @ApiOperation({ title: 'Search all orders'})
    public async getAll(): Promise<Order[]> {
        const order: Order[] = await this.orderService.getOrders();

        return order;
    }

    @Get(':id')
    @ApiOperation({ title: 'Search order by id'})
    public async get(@Param() params): Promise<Order> {
        const order: Order = await this.orderService.getOrderById(params.id);

        return order;
    }

    @Post()
    @ApiOperation({ title: 'Create order'})
    public async create(@Body() createOrder: CreateOrderModel): Promise<Order> {
        const order: Order = await this.orderService.createOrder(createOrder);

        return order;
    }

    @Put()
    @ApiOperation({ title: 'Update order by id'})
    public update(@Body() updateOrder: UpdateOrderModel): Promise<Order> {
        const order: Promise<Order> = this.orderService.updateOrder(updateOrder);

        return order;
    }

    @Delete(':id')
    @ApiOperation({ title: 'Delete order by id'})
    public async delete(@Param() params): Promise<number>  {
        const deleted: number  = await this.orderService.deleteOrder(params.id);

        return deleted;
    }
}
