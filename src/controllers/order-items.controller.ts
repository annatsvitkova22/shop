import { Controller, Post, Body, Get, Put, Delete, Param} from '@nestjs/common';
import { ApiUseTags, ApiOperation } from '@nestjs/swagger';

import { OrderItemService } from 'src/services';
import { CreateOrderItemModel, UpdateOrderItemModel } from 'src/models';
import { OrderItem } from 'src/entity';

@ApiUseTags('Order Item')
@Controller('orderItem')
export class OrderItemsController {

    constructor(private orderItemService: OrderItemService) { }

    @Get(':id')
    @ApiOperation({ title: 'Search order item by id'})
    public async get(id: string): Promise<OrderItem> {
        const orderItem: OrderItem = await this.orderItemService.getOrderItemById(id);

        return orderItem;
    }

    @Get()
    @ApiOperation({ title: 'Search all order items'})
    public async getAll(): Promise<OrderItem[]> {
        const orderItem: OrderItem[] = await this.orderItemService.getOrderItems();

        return orderItem;
    }

    @Post()
    @ApiOperation({ title: 'Create order item'})
    public async create(@Body() orderItem: CreateOrderItemModel): Promise<string> {
        const createOrderItem: string = await this.orderItemService.createOrderItem(orderItem);

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
    public async delete(@Param() params): Promise<number>  {
        const deleted: number  = await this.orderItemService.deleteOrderItem(params.id);

        return deleted;
    }
}
