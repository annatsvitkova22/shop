import { Controller, Post, Body, Get, Put, Delete, Param} from '@nestjs/common';
import { OrderService } from 'src/services';
import { CreateOrderModel, UpdateOrderModel } from 'src/models';

@Controller('order')
export class OrdersController {

    constructor(
        private orderService: OrderService,
        ) { }

    @Get(':id')
    get(@Param() params) {
        const order = this.orderService.getOrderById(params.id);
        return order;
    }

    @Get()
    getAll() {
    const order = this.orderService.getOrders();
    return order;
  }

    @Post()
    create(@Body() order: CreateOrderModel) {
        const createOrder = this.orderService.createOrder(order);
        return createOrder;
    }

    @Put()
    update(@Body() order: UpdateOrderModel) {
        const updateOrder = this.orderService.updateOrder(order);
        return updateOrder;
    }

    @Delete(':id')
    delete(@Param() params) {
        return this.orderService.deleteOrder(params.id);
    }
}
