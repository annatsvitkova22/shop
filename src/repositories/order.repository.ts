import { Injectable } from '@nestjs/common';
import { Order } from 'src/entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';

@Injectable()
export class OrderRepository {
    constructor(@InjectRepository(Order) private orderRepository: Repository<Order>) { }

    public async createOrder(createOrder: Order): Promise<Order> {
        const order = await this.orderRepository.save(createOrder);

        return order;
    }

    public async getOrders(): Promise<Order[]> {
        const getOrders = await this.orderRepository.find();

        return getOrders;
    }

    public async getOrdersById(orderId: Order): Promise<Order[]> {
        const findOrder = await this.orderRepository.find({
            select: ['description', 'userId', 'date', 'paymentId'],
            where: [{ id: orderId.id }],
        });

        return findOrder;
    }

    public async getOrderById(getOrder: Order): Promise<Order> {
        const findOrder = await this.orderRepository.findOne(getOrder.id);

        return findOrder;
    }

    public async deleteOrder(order: Order): Promise<DeleteResult> {
        const result = this.orderRepository.delete(order);

        return result;
    }
}
