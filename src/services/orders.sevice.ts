import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository, DeleteResult } from 'typeorm';

import { Order } from 'src/entity';
import { UpdateOrderModel, CreateOrderModel } from 'src/models';

@Injectable()
export class OrderService {

    constructor(  @Inject('OrderRepository') private readonly orderRepository: typeof Order) { }

    public async getOrders(): Promise<Order[]> {
        const getOrders: Order[] = await this.orderRepository.findAll<Order>();

        return getOrders;
    }

    // public async getOrderById(id: string): Promise<Order> {
    //     const order: UpdateOrderModel = {};
    //     order.id = id;
    //     const foundOrder: Order = await this.orderRepository.findOne(order.id);

    //     return foundOrder;
    // }

    public async createOrder(createOrder: CreateOrderModel): Promise<string> {
        const order = new Order();
        order.description = createOrder.description;
        order.userId = createOrder.userId;
        order.date = createOrder.date;
        order.paymentId = createOrder.paymentId;
        const savedOrder: Order = await this.orderRepository.create<Order>(order);

        return(savedOrder.id);
    }

    // public async updateOrder(updateOrder: UpdateOrderModel): Promise<Order> {
    //     const order: Order = {} as Order;
    //     order.id = updateOrder.id;
    //     order.description = updateOrder.description;
    //     order.userId = updateOrder.userId;
    //     order.date = updateOrder.date;
    //     order.paymentId = updateOrder.paymentId;
    //     const toUpdate = await this.orderRepository.findOne(order.id);
    //     toUpdate.description = order.description;
    //     toUpdate.userId = order.userId;
    //     toUpdate.date = order.date;
    //     toUpdate.paymentId = order.paymentId;

    //     const savedOrder: Order = await this.orderRepository.save(toUpdate);

    //     return savedOrder;
    //   }

    // public async deleteOrder(orderId: string): Promise<boolean|string> {
    //     const order: Order = {} as Order;
    //     order.id = orderId;
    //     const result: DeleteResult = await this.orderRepository.delete(order);
    //     if (result.affected === 0) {
    //         const messege: string = 'id not found';

    //         return messege;
    //     }

    //     return true;
    // }
}
