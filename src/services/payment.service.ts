import { Injectable } from '@nestjs/common';
import { Payment } from 'src/entity';
import { UpdatePaymentModel, CreatePaymentModel } from 'src/models';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PaymentService {

    constructor( @InjectRepository(Payment) private paymentRepository: Repository<Payment>) { }

    async getPayments(): Promise<Payment[]> {
        const getPayments = await this.paymentRepository.find();
        return getPayments;
    }

    async getUPaymentById(id: number) {
        const PaymentId: UpdatePaymentModel = {};
        PaymentId.id = id;
        const payment = await this.paymentRepository.find({
            select: ['transactionId'],
            where: [{ id: PaymentId.id }],
        });
        return payment;
    }

    async createPayment(createPayment: CreatePaymentModel) {
        const getPayment: Payment = {} as Payment;
        getPayment.transactionId = createPayment.transactionId;
        const payment = await this.paymentRepository.save(getPayment);
        return(payment.id);
    }

    async updatePayment(updatePayment: UpdatePaymentModel): Promise<Payment> {
        const getPayment: Payment = {} as Payment;
        getPayment.id = updatePayment.id;
        getPayment.transactionId = updatePayment.transactionId;
        const toUpdate = await this.paymentRepository.findOne(getPayment.id);
        delete toUpdate.transactionId;
        delete getPayment.id;
        const updated = Object.assign(toUpdate, getPayment);
        const payment = await this.paymentRepository.save(updated);
        return payment;
      }

    async deletePayment(paymentId: number) {
        const payment: Payment = {} as Payment;
        payment.id = paymentId;
        const result = this.paymentRepository.delete(payment);
        return result;
    }
}
