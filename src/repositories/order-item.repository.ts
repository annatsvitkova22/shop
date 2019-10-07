import { Injectable } from '@nestjs/common';
import { OrderItem } from 'src/entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OrderItemRepository {
    constructor(@InjectRepository(OrderItem) private orderItemRepository: Repository<OrderItem>) { }

    public async createOrderItem(createOrderItem: OrderItem) {
        const orderItem = await this.orderItemRepository.save(createOrderItem);
        return orderItem;
    }

    public async getOrderItems() {
        const getOrderItems = await this.orderItemRepository.find();
        return getOrderItems;
    }

    public async getOrderItemsById(orderItemId: OrderItem) {
        const findOrderItem = await this.orderItemRepository.find({
            select: ['amount', 'currency', 'pritingEditionId', 'count'],
            where: [{ id: orderItemId.id }],
        });
        return findOrderItem;
    }

    public async getOrderItemById(getOrderItem: OrderItem) {
        const findOrderItem = await this.orderItemRepository.findOne(getOrderItem.id);
        return findOrderItem;
    }

    public async deleteOrderItem(orderItem: OrderItem) {
        const result = this.orderItemRepository.delete(orderItem);
        return result;
    }
}
