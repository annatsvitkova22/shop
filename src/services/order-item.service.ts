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

    public async createOrderItem(createOrderItem: CreateOrderItemModel): Promise<boolean> {
        let query: string = 'INSERT INTO `orderitems` (`id`, `amount`, `currency`, `pritingEditionId`, `orderId`, `count`) VALUES';
        const count: number = createOrderItem.printingEdition.length;
        let i: number = 1;

        if (createOrderItem.printingEdition) {
            for (const printingEdition of createOrderItem.printingEdition) {
                const generatedId: string = this.uuidHelper.uuidv4();
                // tslint:disable-next-line: max-line-length
                query += ' (\'' + generatedId + '\', ' + printingEdition.printingEditionPrice + ', \'' + printingEdition.printingEditionCurrency + '\', \'' + printingEdition.printingEditionId + '\', \'' + createOrderItem.orderId + '\', ' + printingEdition.printingEditionCount + ')';
                if (i < count) {
                    query += ', ';
                }
                if (i === count) {
                    query += ';';
                }
                i++;
            }
        }

        const savedOrderItem: [number, number] = await this.orderItemRepository.createOrderItems(query);
        if (!savedOrderItem) {
            return false;
        }

        return true;
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
