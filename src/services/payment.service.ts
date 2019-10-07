import { Injectable } from '@nestjs/common';
import { Payment } from 'src/entity';
import { PaymentRepository } from 'src/repositories';
import { UpdatePaymentModel, CreatePaymentModel } from 'src/models';

@Injectable()
export class PaymentService {

    constructor( private paymentRepository: PaymentRepository) { }

    async getPayments(): Promise<Payment[]> {
        const getPayments = await this.paymentRepository.getPayments();
        return getPayments;
    }

    async getUPaymentById(id: number) {
        const PaymentId: UpdatePaymentModel = {};
        PaymentId.id = id;
        const payment = await this.paymentRepository.getPaymentsById(PaymentId);
        return payment;
    }

    async createPayment(createPayment: CreatePaymentModel) {
        const getPayment: Payment = {} as Payment;
        getPayment.transactionId = createPayment.transactionId;
        const payment = await this.paymentRepository.createPayment(getPayment);
        return(payment.id);
    }

    async updatePayment(updatePayment: UpdatePaymentModel): Promise<Payment> {
        const getPayment: Payment = {} as Payment;
        getPayment.id = updatePayment.id;
        getPayment.transactionId = updatePayment.transactionId;
        const toUpdate = await this.paymentRepository.getPaymentById(getPayment);
        delete toUpdate.transactionId;
        delete getPayment.id;
        const updated = Object.assign(toUpdate, getPayment);
        const payment = await this.paymentRepository.createPayment(updated);
        return payment;
      }

    async deletePayment(paymentId: number) {
        const payment: Payment = {} as Payment;
        payment.id = paymentId;
        const result = this.paymentRepository.deletePayment(payment);
        return result;
    }
}
