import { Payment } from 'src/entity';

export const paymentsProviders = [
    {
        provide: 'PaymentRepository',
        useValue: Payment,
    },
];
