import { Controller, Post, Body, Get, Put, Delete, Param, UseGuards} from '@nestjs/common';
import { ApiUseTags, ApiOperation } from '@nestjs/swagger';

import { OrderItemService } from 'src/services';
import { CreateOrderItemModel, UpdateOrderItemModel, OrderItemModel } from 'src/models';
import { OrderItem } from 'src/entity';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/common';

@ApiUseTags('Order Item')
@Controller('orderItem')
export class OrderItemsController {

    constructor(private orderItemService: OrderItemService) { }

    @Get()
    @ApiOperation({ title: 'Search all order items'})
    public async getAll(): Promise<OrderItem[]> {
        const orderItem: OrderItem[] = await this.orderItemService.getOrderItems();

        return orderItem;
    }

    @UseGuards(AuthGuard('jwt'))
    @Get(':id')
    @Roles('user')
    @ApiOperation({ title: 'Search order item by id'})
    public async get(@Param() params): Promise<OrderItemModel[]> {
        const orderItem: OrderItemModel[] = await this.orderItemService.getOrderItemByUserId(params.id);

        return orderItem;
    }

    @Post()
    @ApiOperation({ title: 'Create order item'})
    public async create(@Body() createOrderItem: CreateOrderItemModel): Promise<boolean> {
        const orderItem: boolean = await this.orderItemService.createOrderItem(createOrderItem);

        return orderItem;
    }

    @Put()
    @ApiOperation({ title: 'Update order item by id'})
    public update(@Body() updateOrderItem: UpdateOrderItemModel): Promise<OrderItem> {
        const orderItem: Promise<OrderItem> = this.orderItemService.updateOrderItem(updateOrderItem);

        return orderItem;
    }

    @Delete(':id')
    @ApiOperation({ title: 'Delete order item by id'})
    public async delete(@Param() params): Promise<number>  {
        const deleted: number  = await this.orderItemService.deleteOrderItem(params.id);

        return deleted;
    }
}
