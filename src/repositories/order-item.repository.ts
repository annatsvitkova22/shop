import { Injectable } from '@nestjs/common';
import { OrderItem } from 'src/entity';

import db = require('src/entity/order-item.entity');

@Injectable()
export class OrderItemRepository {

    public async getOrderItems(): Promise<OrderItem[]> {
        const getOrderItems: OrderItem[] = await db.OrderItem.findAll();

        return getOrderItems;
    }

    public async getOrderItemById(orderItemId: string): Promise<OrderItem> {
        const orderItem: OrderItem = await db.OrderItem.findOne({
            where: { id: orderItemId },
        });

        return orderItem;
    }

    public async createOrderItem(createOrderItem: OrderItem): Promise<OrderItem> {
        const orderItem: OrderItem = await createOrderItem.save();

        return orderItem;
    }

    public async deleteOrderItem(orderItemId: string): Promise<number> {
        const deleted: number = await db.OrderItem.destroy({
            where: { id: orderItemId },
        });

        return deleted;
    }
}
