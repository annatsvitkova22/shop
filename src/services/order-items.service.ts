import { Injectable } from '@nestjs/common';
import { OrderItem } from 'src/entity';
import { UpdateOrderItemModel, CreateOrderItemModel } from 'src/models';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OrderItemService {

    constructor( @InjectRepository(OrderItem) private orderItemRepository: Repository<OrderItem>) { }

    async getOrderItems(): Promise<OrderItem[]> {
        const getOrderItems = await this.orderItemRepository.find();
        return getOrderItems;
    }

    async getOrderItemById(id: number) {
        const OrderItemId: UpdateOrderItemModel = {};
        OrderItemId.id = id;
        const orderItem = await this.orderItemRepository.find({
            select: ['pritingEditionId', 'count'],
            where: [{ id: OrderItemId.id }],
        });
        return orderItem;
    }

    async createOrderItem(createOrderItem: CreateOrderItemModel) {
        const getOrderItem: OrderItem = {} as OrderItem;
        getOrderItem.pritingEditionId = createOrderItem.pritingEditionId;
        getOrderItem.count = createOrderItem.count;
        const orderItem = await this.orderItemRepository.save(getOrderItem);
        return(orderItem.id);
    }

    async updateOrderItem(updateOrderItem: UpdateOrderItemModel): Promise<OrderItem> {
        const getOrderItem: OrderItem = {} as OrderItem;
        getOrderItem.id = updateOrderItem.id;
        getOrderItem.pritingEditionId = updateOrderItem.pritingEditionId;
        getOrderItem.count = updateOrderItem.count;
        const toUpdate = await this.orderItemRepository.findOne(getOrderItem.id);
        delete toUpdate.pritingEditionId;
        delete toUpdate.count;
        delete getOrderItem.id;
        const updated = Object.assign(toUpdate, getOrderItem);
        const orderItem = await this.orderItemRepository.save(updated);
        return orderItem;
      }

    async deleteOrderItem(orderItemId: number) {
        const orderItem: OrderItem = {} as OrderItem;
        orderItem.id = orderItemId;
        const result = this.orderItemRepository.delete(orderItem);
        return result;
    }
}
