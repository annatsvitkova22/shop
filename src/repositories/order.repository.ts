import { Injectable } from '@nestjs/common';
import { Order } from 'src/entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OrderRepository {
    constructor(@InjectRepository(Order) private orderRepository: Repository<Order>) { }

    public async createOrder(createOrder: Order) {
        const order = await this.orderRepository.save(createOrder);
        return order;
    }

    public async getOrders() {
        const getOrders = await this.orderRepository.find();
        return getOrders;
    }

    public async getOrdersById(orderId: Order) {
        const findOrder = await this.orderRepository.find({
            select: ['description', 'userId', 'date', 'paymentId'],
            where: [{ id: orderId.id }],
        });
        return findOrder;
    }

    public async getOrderById(getOrder: Order) {
        const findOrder = await this.orderRepository.findOne(getOrder.id);
        return findOrder;
    }

    public async deleteOrder(order: Order) {
        const result = this.orderRepository.delete(order);
        return result;
    }
}
