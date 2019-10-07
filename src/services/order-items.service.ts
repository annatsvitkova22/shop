import { Injectable } from '@nestjs/common';
import { OrderItem } from 'src/entity';
import { OrderItemRepository } from 'src/repositories';
import { UpdateOrderItemModel, CreateOrderItemModel } from 'src/models';

@Injectable()
export class OrderItemService {

    constructor( private orderItemRepository: OrderItemRepository) { }

    async getOrderItems(): Promise<OrderItem[]> {
        const getOrderItems = await this.orderItemRepository.getOrderItems();
        return getOrderItems;
    }

    async getOrderItemById(id: number) {
        const OrderItemId: UpdateOrderItemModel = {};
        OrderItemId.id = id;
        const orderItem = await this.orderItemRepository.getOrderItemsById(OrderItemId);
        return orderItem;
    }

    async createOrderItem(createOrderItem: CreateOrderItemModel) {
        const getOrderItem: OrderItem = {} as OrderItem;
        getOrderItem.amount = createOrderItem.amount;
        getOrderItem.currency = createOrderItem.currency;
        getOrderItem.pritingEditionId = createOrderItem.pritingEditionId;
        getOrderItem.count = createOrderItem.count;
        const orderItem = await this.orderItemRepository.createOrderItem(getOrderItem);
        return(orderItem.id);
    }

    async updateOrderItem(updateOrderItem: UpdateOrderItemModel): Promise<OrderItem> {
        const getOrderItem: OrderItem = {} as OrderItem;
        getOrderItem.id = updateOrderItem.id;
        getOrderItem.amount = updateOrderItem.amount;
        getOrderItem.currency = updateOrderItem.currency;
        getOrderItem.pritingEditionId = updateOrderItem.pritingEditionId;
        getOrderItem.count = updateOrderItem.count;
        const toUpdate = await this.orderItemRepository.getOrderItemById(getOrderItem);
        delete toUpdate.amount;
        delete toUpdate.currency;
        delete toUpdate.pritingEditionId;
        delete toUpdate.count;
        delete getOrderItem.id;
        const updated = Object.assign(toUpdate, getOrderItem);
        const orderItem = await this.orderItemRepository.createOrderItem(updated);
        return orderItem;
      }

    async deleteOrderItem(orderItemId: number) {
        const orderItem: OrderItem = {} as OrderItem;
        orderItem.id = orderItemId;
        const result = this.orderItemRepository.deleteOrderItem(orderItem);
        return result;
    }
}
