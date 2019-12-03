import { Injectable, Inject, forwardRef } from '@nestjs/common';

import { OrderItem } from 'src/entity';
import { UpdateOrderItemModel, CreateOrderItemModel, OrderItemModel } from 'src/models';
import { UuidHelper } from 'src/common';
import { OrderItemRepository } from 'src/repositories/order-item.repository';

@Injectable()
export class OrderItemService {

    constructor(
        private readonly orderItemRepository: OrderItemRepository,
        @Inject(forwardRef(() => UuidHelper)) public uuidHelper: UuidHelper,
        ) { }

    public async getOrderItems(): Promise<OrderItem[]> {
        const getOrderItems: OrderItem[] = await this.orderItemRepository.getOrderItems();

        return getOrderItems;
    }

    public async getOrderItemByUserId(userId: string): Promise<OrderItemModel[]> {
        // tslint:disable-next-line: max-line-length
        let query = 'SELECT orderitems.*, printingeditions.name, orders.userId FROM orderitems INNER JOIN printingeditions ON orderitems.pritingEditionId = printingeditions.id INNER JOIN orders ON orderitems.orderId = orders.id WHERE orders.userId = \'';
        query += userId + '\' AND orders.paymentId IS NULL';
        const foundOrderItem: OrderItemModel[] = await this.orderItemRepository.getOrderItemByUserId(query);

        return foundOrderItem;
    }

    public async createOrderItem(createOrderItem: CreateOrderItemModel): Promise<OrderItem> {
        const orderItem: OrderItem = new OrderItem();
        orderItem.pritingEditionId = createOrderItem.printingEditionId;
        orderItem.amount = createOrderItem.amount;
        orderItem.currency = createOrderItem.currency;
        orderItem.count = createOrderItem.count;
        orderItem.orderId = createOrderItem.orderId;
        orderItem.id = this.uuidHelper.uuidv4();

        const foundOrdetItem: OrderItem = await this.orderItemRepository.getOrderItemByPrintingEditionId(orderItem.pritingEditionId);
        if (foundOrdetItem) {
            foundOrdetItem.count ++;
            foundOrdetItem.amount += orderItem.amount;
            const updatedOrderItem: OrderItem = await this.orderItemRepository.createOrderItem(foundOrdetItem);

            return updatedOrderItem;
        }
        const savedOrderItem: OrderItem = await this.orderItemRepository.createOrderItem(orderItem);

        return savedOrderItem;
    }

    public async updateOrderItem(updateOrderItem: UpdateOrderItemModel): Promise<OrderItem> {
        const orderItem: OrderItem = new OrderItem();
        orderItem.id = updateOrderItem.id;
        orderItem.pritingEditionId = updateOrderItem.pritingEditionId;
        orderItem.amount = updateOrderItem.amount;
        orderItem.currency = updateOrderItem.currency;
        orderItem.count = updateOrderItem.count;

        const toUpdate: OrderItem = await this.orderItemRepository.getOrderItemById(orderItem.id);
        toUpdate.pritingEditionId = orderItem.pritingEditionId;
        toUpdate.amount = orderItem.amount;
        toUpdate.currency = orderItem.currency;
        toUpdate.count = orderItem.count;

        const sevedOrderItem: OrderItem = await this.orderItemRepository.createOrderItem(toUpdate);

        return sevedOrderItem;
      }

    public async deleteOrderItem(orderItemId: string): Promise<number> {
        const result: number = await this.orderItemRepository.deleteOrderItem(orderItemId);

        return result;
    }
}
