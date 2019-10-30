import { Injectable, Inject, forwardRef } from '@nestjs/common';

import { Order } from 'src/entity';
import { UpdateOrderModel, CreateOrderModel } from 'src/models';
import { UuidHelper } from 'src/common';
import { OrderRepository } from 'src/repositories';

@Injectable()
export class OrderService {

    constructor(
        private readonly orderRepository: OrderRepository,
        @Inject(forwardRef(() => UuidHelper)) public uuidHelper: UuidHelper,
        ) { }

    public async getOrders(): Promise<Order[]> {
        const getOrders: Order[] = await this.orderRepository.getOrders();

        return getOrders;
    }

    public async getOrderById(id: string): Promise<Order> {
        const order = new UpdateOrderModel();
        order.id = id;
        const foundOrder: Order = await this.orderRepository.getOrderById(order.id);

        return foundOrder;
    }

    public async createOrder(createOrder: CreateOrderModel): Promise<Order> {
        const order = new Order();
        order.description = createOrder.description;
        order.userId = createOrder.userId;
        order.date = createOrder.date;
        order.paymentId = createOrder.paymentId;
        order.id = this.uuidHelper.uuidv4();

        const savedOrder: Order = await this.orderRepository.createOrder(order);

        return savedOrder;
    }

    public async updateOrder(updateOrder: UpdateOrderModel): Promise<Order> {
        const order = new Order();
        order.id = updateOrder.id;
        order.description = updateOrder.description;
        order.userId = updateOrder.userId;
        order.date = updateOrder.date;
        order.paymentId = updateOrder.paymentId;
        const toUpdate = await this.orderRepository.getOrderById(order.id);
        toUpdate.description = order.description;
        toUpdate.userId = order.userId;
        toUpdate.date = order.date;
        toUpdate.paymentId = order.paymentId;

        const savedOrder: Order = await this.orderRepository.createOrder(toUpdate);

        return savedOrder;
      }

    public async deleteOrder(orderId: string): Promise<number> {
        const deleted: number = await this.orderRepository.deleteOrder(orderId);

        return deleted;
    }
}
