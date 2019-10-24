// import { Injectable } from '@nestjs/common';
// import { OrderItem } from 'src/entity';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository, DeleteResult } from 'typeorm';

// @Injectable()
// export class OrderItemRepository {
//     constructor(@InjectRepository(OrderItem) private orderItemRepository: Repository<OrderItem>) { }

//     public async createOrderItem(createOrderItem: OrderItem): Promise<OrderItem> {
//         const orderItem: OrderItem = await this.orderItemRepository.save(createOrderItem);

//         return orderItem;
//     }

//     public async getOrderItems(): Promise<OrderItem[]> {
//         const getOrderItems: OrderItem[] = await this.orderItemRepository.find();

//         return getOrderItems;
//     }

//     public async getOrderItemsById(orderItemId: OrderItem): Promise<OrderItem[]> {
//         const findOrderItem: OrderItem[] = await this.orderItemRepository.find({
//             select: ['pritingEditionId', 'count'],
//             where: [{ id: orderItemId.id }],
//         });

//         return findOrderItem;
//     }

//     public async getOrderItemById(getOrderItem: OrderItem): Promise<OrderItem> {
//         const findOrderItem: OrderItem = await this.orderItemRepository.findOne(getOrderItem.id);

//         return findOrderItem;
//     }

//     public async deleteOrderItem(orderItem: OrderItem): Promise<DeleteResult> {
//         const result: Promise<DeleteResult> = this.orderItemRepository.delete(orderItem);

//         return result;
//     }
// }
