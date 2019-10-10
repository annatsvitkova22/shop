import { Injectable } from '@nestjs/common';
import { OrderItem } from 'src/entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';

@Injectable()
export class OrderItemRepository {
    constructor(@InjectRepository(OrderItem) private orderItemRepository: Repository<OrderItem>) { }

    public async createOrderItem(createOrderItem: OrderItem): Promise<OrderItem> {
        const orderItem = await this.orderItemRepository.save(createOrderItem);

        return orderItem;
    }

    public async getOrderItems(): Promise<OrderItem[]> {
        const getOrderItems = await this.orderItemRepository.find();

        return getOrderItems;
    }

    public async getOrderItemsById(orderItemId: OrderItem): Promise<OrderItem[]> {
        const findOrderItem = await this.orderItemRepository.find({
            select: ['pritingEditionId', 'count'],
            where: [{ id: orderItemId.id }],
        });

        return findOrderItem;
    }

    public async getOrderItemById(getOrderItem: OrderItem): Promise<OrderItem> {
        const findOrderItem = await this.orderItemRepository.findOne(getOrderItem.id);

        return findOrderItem;
    }

    public async deleteOrderItem(orderItem: OrderItem): Promise<DeleteResult> {
        const result = this.orderItemRepository.delete(orderItem);

        return result;
    }
}
