import { Controller, Post, Body, Get, Put, Delete, Param} from '@nestjs/common';
import { OrderItemService } from 'src/services';
import { CreateOrderItemModel, UpdateOrderItemModel } from 'src/models';

@Controller('orderItem')
export class OrderItemsController {

    constructor(
        private orderItemService: OrderItemService,
        ) { }

    @Get(':id')
    get(@Param() params) {
        const orderItem = this.orderItemService.getOrderItemById(params.id);
        return orderItem;
    }

    @Get()
    getAll() {
    const orderItem = this.orderItemService.getOrderItems();
    return orderItem;
  }

    @Post()
    create(@Body() orderItem: CreateOrderItemModel) {
        const createOrderItem = this.orderItemService.createOrderItem(orderItem);
        return createOrderItem;
    }

    @Put()
    update(@Body() orderItem: UpdateOrderItemModel) {
        const updateOrderItem = this.orderItemService.updateOrderItem(orderItem);
        return updateOrderItem;
    }

    @Delete(':id')
    delete(@Param() params) {
        return this.orderItemService.deleteOrderItem(params.id);
    }
}
