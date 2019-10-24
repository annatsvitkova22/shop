import { OrderItem } from 'src/entity';

export const orderItemsProviders = [
    {
        provide: 'OrderItemRepository',
        useValue: OrderItem,
    },
];
