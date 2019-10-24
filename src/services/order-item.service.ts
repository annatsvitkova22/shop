import { Injectable, Inject } from '@nestjs/common';

import { OrderItem } from 'src/entity';
import { UpdateOrderItemModel, CreateOrderItemModel } from 'src/models';

@Injectable()
export class OrderItemService {

    constructor( @Inject('OrderItemRepository') private readonly orderItemRepository: typeof OrderItem) { }

    public async getOrderItems(): Promise<OrderItem[]> {
        const getOrderItems: OrderItem[] = await this.orderItemRepository.findAll<OrderItem>();

        return getOrderItems;
    }

    public async getOrderItemById(id: string): Promise<OrderItem> {
        const orderItem = new UpdateOrderItemModel();
        orderItem.id = id;
        const foundOrderItem: OrderItem = await this.orderItemRepository.findOne({
            where: {id: orderItem.id},
          });

        return foundOrderItem;
    }

    public async createOrderItem(createOrderItem: CreateOrderItemModel): Promise<string> {
        const orderItem = new OrderItem();
        orderItem.pritingEditionId = createOrderItem.pritingEditionId;
        orderItem.amount = createOrderItem.amount;
        orderItem.currency = createOrderItem.currency;
        orderItem.count = createOrderItem.count;

        const savedOrderItem: OrderItem = await this.orderItemRepository.create<OrderItem>(orderItem);

        return(savedOrderItem.id);
    }

    // public async updateOrderItem(updateOrderItem: UpdateOrderItemModel): Promise<OrderItem> {
    //     const orderItem: OrderItem = {} as OrderItem;
    //     orderItem.id = updateOrderItem.id;
    //     orderItem.pritingEditionId = updateOrderItem.pritingEditionId;
    //     orderItem.amount = updateOrderItem.amount;
    //     orderItem.currency = updateOrderItem.currency;
    //     orderItem.count = updateOrderItem.count;

    //     const toUpdate: OrderItem = await this.orderItemRepository.findOne(orderItem.id);
    //     toUpdate.pritingEditionId = orderItem.pritingEditionId;
    //     toUpdate.amount = orderItem.amount;
    //     toUpdate.currency = orderItem.currency;
    //     toUpdate.count = orderItem.count;

    //     const sevedOrderItem: OrderItem = await this.orderItemRepository.save(toUpdate);

    //     return sevedOrderItem;
    //   }

    public async deleteOrderItem(orderItemId: string): Promise<number> {
        const result: number = await this.orderItemRepository.destroy({
            where: { id: orderItemId },
          });

        return result;
    }
}
