import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository, DeleteResult } from 'typeorm';

import { OrderItem } from 'src/entity';
import { UpdateOrderItemModel, CreateOrderItemModel } from 'src/models';

@Injectable()
export class OrderItemService {

    constructor( @InjectRepository(OrderItem) private orderItemRepository: Repository<OrderItem>) { }

    public async getOrderItems(): Promise<OrderItem[]> {
        const getOrderItems: OrderItem[] = await this.orderItemRepository.find();

        return getOrderItems;
    }

    public async getOrderItemById(id: number): Promise<OrderItem[]> {
        const orderItem: UpdateOrderItemModel = {};
        orderItem.id = id;
        const foundOrderItem: OrderItem[] = await this.orderItemRepository.find({
            select: ['pritingEditionId', 'count'],
            where: [{ id: orderItem.id }],
        });

        return foundOrderItem;
    }

    public async createOrderItem(createOrderItem: CreateOrderItemModel): Promise<number> {
        const orderItem: OrderItem = {} as OrderItem;
        orderItem.pritingEditionId = createOrderItem.pritingEditionId;
        orderItem.count = createOrderItem.count;
        const savedOrderItem: OrderItem = await this.orderItemRepository.save(orderItem);

        return(savedOrderItem.id);
    }

    public async updateOrderItem(updateOrderItem: UpdateOrderItemModel): Promise<OrderItem> {
        const orderItem: OrderItem = {} as OrderItem;
        orderItem.id = updateOrderItem.id;
        orderItem.pritingEditionId = updateOrderItem.pritingEditionId;
        orderItem.count = updateOrderItem.count;

        const toUpdate: OrderItem = await this.orderItemRepository.findOne(orderItem.id);
        toUpdate.pritingEditionId = orderItem.pritingEditionId;
        toUpdate.count = orderItem.count;

        const sevedOrderItem: OrderItem = await this.orderItemRepository.save(toUpdate);

        return sevedOrderItem;
      }

    public async deleteOrderItem(orderItemId: number): Promise<boolean|string> {
        const orderItem: OrderItem = {} as OrderItem;
        orderItem.id = orderItemId;
        const result: Promise<DeleteResult> = this.orderItemRepository.delete(orderItem);
        if (!result) {
            const messege: string = 'id not found';

            return messege;
        }

        return true;
    }
}
