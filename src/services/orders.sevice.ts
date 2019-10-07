import { Injectable } from '@nestjs/common';
import { Order } from 'src/entity';
import { UpdateOrderModel, CreateOrderModel } from 'src/models';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService {

    constructor( @InjectRepository(Order) private orderRepository: Repository<Order>) { }

    async getOrders(): Promise<Order[]> {
        const getOrders = await this.orderRepository.find();
        return getOrders;
    }

    async getOrderById(id: number) {
        const OrderId: UpdateOrderModel = {};
        OrderId.id = id;
        const order = await this.orderRepository.find({
            select: ['description', 'userId', 'date', 'paymentId'],
            where: [{ id: OrderId.id }],
        });
        return order;
    }

    async createOrder(createOrder: CreateOrderModel) {
        const getOrder: Order = {} as Order;
        getOrder.description = createOrder.description;
        getOrder.userId = createOrder.userId;
        getOrder.date = createOrder.date;
        getOrder.paymentId = createOrder.paymentId;
        const order = await this.orderRepository.save(getOrder);
        return(order.id);
    }

    async updateOrder(updateOrder: UpdateOrderModel): Promise<Order> {
        const getOrder: Order = {} as Order;
        getOrder.id = updateOrder.id;
        getOrder.description = updateOrder.description;
        getOrder.userId = updateOrder.userId;
        getOrder.date = updateOrder.date;
        getOrder.paymentId = updateOrder.paymentId;
        const toUpdate = await this.orderRepository.findOne(getOrder.id);
        delete toUpdate.description;
        delete toUpdate.userId;
        delete toUpdate.date;
        delete toUpdate.paymentId;
        delete getOrder.id;
        const updated = Object.assign(toUpdate, getOrder);
        const order = await this.orderRepository.save(updated);
        return order;
      }

    async deleteOrder(orderId: number) {
        const order: Order = {} as Order;
        order.id = orderId;
        const result = this.orderRepository.delete(order);
        return result;
    }
}
