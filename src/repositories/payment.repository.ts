import { Injectable } from '@nestjs/common';
import { Payment } from 'src/entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PaymentRepository {
    constructor(@InjectRepository(Payment) private paymentRepository: Repository<Payment>) { }

    public async createPayment(createPayment: Payment) {
        const payment = await this.paymentRepository.save(createPayment);
        return payment;
    }

    public async getPayments() {
        const getPayments = await this.paymentRepository.find();
        return getPayments;
    }

    public async getPaymentsById(paymentId: Payment) {
        const findPayment = await this.paymentRepository.find({
            select: ['transactionId'],
            where: [{ id: paymentId.id }],
        });
        return findPayment;
    }

    public async getPaymentById(getPayment: Payment) {
        const findPayment = await this.paymentRepository.findOne(getPayment.id);
        return findPayment;
    }

    public async deletePayment(payment: Payment) {
        const result = this.paymentRepository.delete(payment);
        return result;
    }
}
