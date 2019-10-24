import { Order } from 'src/entity';

export const ordersProviders = [
    {
        provide: 'OrderRepository',
        useValue: Order,
    },
];
