import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository, DeleteResult } from 'typeorm';

import { Payment } from 'src/entity';
import { UpdatePaymentModel, CreatePaymentModel } from 'src/models';
import { PaymentHelper } from 'src/common';

@Injectable()
export class PaymentService {

    constructor(
        @Inject(forwardRef(() => PaymentHelper)) public paymentHelper: PaymentHelper,
        @InjectRepository(Payment) private paymentRepository: Repository<Payment>) { }

    public async getPayments(): Promise<Payment[]> {
        const getPayments = await this.paymentRepository.find();

        return getPayments;
    }

    public async getUPaymentById(id: number): Promise<Payment> {
        const payment: UpdatePaymentModel = {};
        payment.id = id;
        const foundPayment = await this.paymentRepository.findOne({id: payment.id });

        return foundPayment;
    }

    public async createPayment(createPayment: CreatePaymentModel): Promise<number> {
        const payment: Payment = {};
        const transactionId = await this.paymentHelper.Charge(createPayment.email, createPayment.source, createPayment.description,
            createPayment.currency, createPayment.amount);
        payment.transactionId = transactionId;
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
