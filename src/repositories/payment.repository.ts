import { Injectable } from '@nestjs/common';
import { Payment } from 'src/entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';

@Injectable()
export class PaymentRepository {
    constructor(@InjectRepository(Payment) private paymentRepository: Repository<Payment>) { }

    public async createPayment(createPayment: Payment): Promise<Payment> {
        const payment: Payment = await this.paymentRepository.save(createPayment);

        return payment;
    }

    public async getPayments(): Promise<Payment[]> {
        const getPayments: Payment[] = await this.paymentRepository.find();

        return getPayments;
    }

    public async getPaymentsById(paymentId: Payment): Promise<Payment[]> {
        const findPayment: Payment[] = await this.paymentRepository.find({
            select: ['transactionId'],
            where: [{ id: paymentId.id }],
        });

        return findPayment;
    }

    public async getPaymentById(getPayment: Payment): Promise<Payment> {
        const findPayment: Payment = await this.paymentRepository.findOne(getPayment.id);

        return findPayment;
    }

    public async deletePayment(payment: Payment): Promise<DeleteResult> {
        const result: Promise<DeleteResult> = this.paymentRepository.delete(payment);

        return result;
    }
}
