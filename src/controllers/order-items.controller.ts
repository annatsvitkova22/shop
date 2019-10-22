import { Controller, Post, Body, Get, Put, Delete, Param} from '@nestjs/common';
import { ApiUseTags, ApiOperation } from '@nestjs/swagger';

import { OrderItemService } from 'src/services';
import { CreateOrderItemModel, UpdateOrderItemModel } from 'src/models';
import { OrderItem } from 'src/entity';

@ApiUseTags('Order Items table')
@Controller('orderItem')
export class OrderItemsController {

    constructor(private orderItemService: OrderItemService) { }

    @Get(':id')
    @ApiOperation({ title: 'Search order item by id'})
    public get(id: string): Promise<OrderItem> {
        const orderItem: Promise<OrderItem> = this.orderItemService.getOrderItemById(id);

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
    public create(@Body() orderItem: CreateOrderItemModel): Promise<string> {
        const createOrderItem: Promise<string> = this.orderItemService.createOrderItem(orderItem);

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
    public delete(@Param() params): Promise<boolean|string>  {
        const deleted: Promise<boolean|string>  = this.orderItemService.deleteOrderItem(params.id);

        return deleted;
    }
}
