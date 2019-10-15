import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository, DeleteResult } from 'typeorm';

import { Payment } from 'src/entity';
import { UpdatePaymentModel, CreatePaymentModel } from 'src/models';

@Injectable()
export class PaymentService {

    constructor( @InjectRepository(Payment) private paymentRepository: Repository<Payment>) { }

    public async getPayments(): Promise<Payment[]> {
        const getPayments = await this.paymentRepository.find();

        return getPayments;
    }

    public async getUPaymentById(id: number): Promise<Payment[]> {
        const payment: UpdatePaymentModel = {};
        payment.id = id;
        const foundPayment = await this.paymentRepository.find({
            select: ['transactionId'],
            where: [{ id: payment.id }],
        });

        return foundPayment;
    }

    public async createPayment(createPayment: CreatePaymentModel): Promise<number> {
        const payment: Payment = {};
        payment.transactionId = createPayment.transactionId;
        const savedPayment = await this.paymentRepository.save(payment);

        return(savedPayment.id);
    }

    public async updatePayment(updatePayment: UpdatePaymentModel): Promise<Payment> {
        const payment: Payment = {};
        payment.id = updatePayment.id;
        payment.transactionId = updatePayment.transactionId;
        const toUpdate = await this.paymentRepository.findOne(payment.id);
        toUpdate.transactionId = payment.transactionId;

        const savedPayment = await this.paymentRepository.save(toUpdate);

        return savedPayment;
      }

    public async deletePayment(paymentId: number): Promise<DeleteResult> {
        const payment: Payment = {};
        payment.id = paymentId;
        const result = this.paymentRepository.delete(payment);

        return result;
    }
}
