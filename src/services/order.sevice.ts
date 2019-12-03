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
        const foundOrder: Order = await this.orderRepository.getOrderById(id);

        return foundOrder;
    }

    public async createOrder(createOrder: CreateOrderModel): Promise<Order> {
        const order: Order = new Order();
        order.userId = createOrder.userId;
        order.date = createOrder.date;
        order.id = this.uuidHelper.uuidv4();
        const foundUser: Order = await this.orderRepository.getOrderByUserId(order.userId);
        if (foundUser) {
            return foundUser;
        }
        const savedOrder: Order = await this.orderRepository.createOrder(order);

        return savedOrder;
    }

    public async updateOrder(updateOrder: UpdateOrderModel): Promise<Order> {
        const order: Order = new Order();
        order.id = updateOrder.id;
        order.description = updateOrder.description;
        order.userId = updateOrder.userId;
        order.date = updateOrder.date;
        order.paymentId = updateOrder.paymentId;

        const toUpdate: Order = await this.orderRepository.getOrderById(order.id);
        toUpdate.description = order.description;
        toUpdate.userId = order.userId;
        toUpdate.date = order.date;
        toUpdate.paymentId = order.paymentId;

        const savedOrder: Order = await this.orderRepository.createOrder(toUpdate);

        return savedOrder;
      }

    public async deleteOrder(userId: string): Promise<number> {
        const deleted: number = await this.orderRepository.deleteOrder(userId);

        return deleted;
    }
}
