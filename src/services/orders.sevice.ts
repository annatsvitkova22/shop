import { Injectable } from '@nestjs/common';
import { Order } from 'src/entity';
import { UpdateOrderModel, CreateOrderModel } from 'src/models';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';

@Injectable()
export class OrderService {

    constructor( @InjectRepository(Order) private orderRepository: Repository<Order>) { }

    public async getOrders(): Promise<Order[]> {
        const getOrders = await this.orderRepository.find();

        return getOrders;
    }

    public async getOrderById(id: number): Promise<Order[]> {
        const order: UpdateOrderModel = {};
        order.id = id;
        const foundOrder = await this.orderRepository.find({
            select: ['description', 'userId', 'date', 'paymentId'],
            where: [{ id: order.id }],
        });

        return foundOrder;
    }

    public async createOrder(createOrder: CreateOrderModel): Promise<number> {
        const order: Order = {} as Order;
        order.description = createOrder.description;
        order.userId = createOrder.userId;
        order.date = createOrder.date;
        order.paymentId = createOrder.paymentId;
        const savedOrder = await this.orderRepository.save(order);

        return(savedOrder.id);
    }

    public async updateOrder(updateOrder: UpdateOrderModel): Promise<Order> {
        const order: Order = {} as Order;
        order.id = updateOrder.id;
        order.description = updateOrder.description;
        order.userId = updateOrder.userId;
        order.date = updateOrder.date;
        order.paymentId = updateOrder.paymentId;
        const toUpdate = await this.orderRepository.findOne(order.id);
        toUpdate.description = order.description;
        toUpdate.userId = order.userId;
        toUpdate.date = order.date;
        toUpdate.paymentId = order.paymentId;

        const savedOrder = await this.orderRepository.save(toUpdate);

        return savedOrder;
      }

    public async deleteOrder(orderId: number): Promise<DeleteResult> {
        const order: Order = {} as Order;
        order.id = orderId;
        const result = this.orderRepository.delete(order);

        return result;
    }
}
