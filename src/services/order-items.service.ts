import { Injectable } from '@nestjs/common';
import { OrderItem } from 'src/entity';
import { UpdateOrderItemModel, CreateOrderItemModel } from 'src/models';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';

@Injectable()
export class OrderItemService {

    constructor( @InjectRepository(OrderItem) private orderItemRepository: Repository<OrderItem>) { }

    public async getOrderItems(): Promise<OrderItem[]> {
        const getOrderItems = await this.orderItemRepository.find();

        return getOrderItems;
    }

    public async getOrderItemById(id: number): Promise<OrderItem[]> {
        const orderItem: UpdateOrderItemModel = {};
        orderItem.id = id;
        const foundOrderItem = await this.orderItemRepository.find({
            select: ['pritingEditionId', 'count'],
            where: [{ id: orderItem.id }],
        });

        return foundOrderItem;
    }

    public async createOrderItem(createOrderItem: CreateOrderItemModel): Promise<number> {
        const orderItem: OrderItem = {} as OrderItem;
        orderItem.pritingEditionId = createOrderItem.pritingEditionId;
        orderItem.count = createOrderItem.count;
        const savedOrderItem = await this.orderItemRepository.save(orderItem);

        return(savedOrderItem.id);
    }

    public async updateOrderItem(updateOrderItem: UpdateOrderItemModel): Promise<OrderItem> {
        const orderItem: OrderItem = {} as OrderItem;
        orderItem.id = updateOrderItem.id;
        orderItem.pritingEditionId = updateOrderItem.pritingEditionId;
        orderItem.count = updateOrderItem.count;

        const toUpdate = await this.orderItemRepository.findOne(orderItem.id);
        toUpdate.pritingEditionId = orderItem.pritingEditionId;
        toUpdate.count = orderItem.count;

        const sevedOrderItem = await this.orderItemRepository.save(toUpdate);

        return sevedOrderItem;
      }

    public async deleteOrderItem(orderItemId: number): Promise<DeleteResult> {
        const orderItem: OrderItem = {} as OrderItem;
        orderItem.id = orderItemId;
        const result = this.orderItemRepository.delete(orderItem);

        return result;
    }
}
