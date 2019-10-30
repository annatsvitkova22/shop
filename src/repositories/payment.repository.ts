import { Injectable } from '@nestjs/common';
import { Payment } from 'src/entity';

const db = require('src/entity/payment.entity');

@Injectable()
export class PaymentRepository {

    public async getPayments(): Promise<Payment[]> {
        const getPayments: Payment[] = await db.Payment.findAll();

        return getPayments;
    }

    public async getPaymentById(paymentId: string): Promise<Payment> {
        const payment: Payment = await db.Payment.findOne({
            where: { id: paymentId },
        });

        return payment;
    }

    public async createPayment(createPayment: Payment): Promise<Payment> {
        const payment: Payment = await createPayment.save();

        return payment;
    }

    public async deletePayment(paymentId: string): Promise<number> {
        const deleted: number = await db.Payment.destroy({
            where: { id: paymentId },
        });

        return deleted;
    }
}
