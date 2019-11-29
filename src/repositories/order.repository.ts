import { Injectable } from '@nestjs/common';
import { Order } from 'src/entity';

import db = require('src/entity/order.entity');

@Injectable()
export class OrderRepository {

    public async getOrders(): Promise<Order[]> {
        const getOrders: Order[] = await db.Order.findAll();

        return getOrders;
    }

    public async getOrderById(orderId: string): Promise<Order> {
        const order: Order = await db.Order.findOne({
            where: { id: orderId },
        });

        return order;
    }

    public async createOrder(createOrder: Order): Promise<Order> {
        const order: Order = await createOrder.save();

        return order;
    }

    public async deleteOrder(orderId: string): Promise<number> {
        const deleted: number = await db.Order.destroy({
            where: { id: orderId },
        });

        return deleted;
    }
}
