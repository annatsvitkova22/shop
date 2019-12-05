import { Injectable, Inject, forwardRef } from '@nestjs/common';

import { Payment } from 'src/entity';
import { UpdatePaymentModel, CreatePaymentModel } from 'src/models';
import { Enviroment, getEnv } from 'src/environment/environment';
import { UuidHelper } from 'src/common';
import { PaymentRepository } from 'src/repositories/payment.repository';

const myEnvitonment: Enviroment = getEnv();

@Injectable()
export class PaymentService {

    constructor(
      private readonly paymentRepository: PaymentRepository,
      @Inject(forwardRef(() => UuidHelper)) public uuidHelper: UuidHelper,
      ) { }

    public async getPayments(): Promise<Payment[]> {
        const getPayments: Payment[] = await this.paymentRepository.getPayments();

        return getPayments;
    }

    public async getUPaymentById(id: string): Promise<Payment> {
        const foundPayment: Payment = await this.paymentRepository.getPaymentById(id);

        return foundPayment;
    }

    public async createPayment(createPayment: CreatePaymentModel): Promise<Payment> {
        const payment: Payment = new Payment();
        const transactionId: string = await this.charge(createPayment);
        payment.transactionId = transactionId;
        payment.id = this.uuidHelper.uuidv4();

        const savedPayment: Payment = await this.paymentRepository.createPayment(payment);

        return savedPayment;
    }

    public async updatePayment(updatePayment: UpdatePaymentModel): Promise<Payment> {
        const payment: Payment = new Payment();
        payment.id = updatePayment.id;
        payment.transactionId = updatePayment.transactionId;
        const toUpdate: Payment = await this.paymentRepository.getPaymentById(payment.id);
        toUpdate.transactionId = payment.transactionId;

        const savedPayment: Payment = await this.paymentRepository.createPayment(toUpdate);

        return savedPayment;
      }

    public async deletePayment(paymentId: string): Promise<number> {
        const result: number = await this.paymentRepository.deletePayment(paymentId);

        return result;
    }

    public async charge(payment: CreatePaymentModel): Promise<string> {
        const status: string = 'succeeded';
        const messege: string = 'Error';
        const stripe = require('stripe')(myEnvitonment.stripeApiKey);
        const customer = await stripe.customers.create({
          email: payment.email,
          source: payment.source,
        });
        const charge = await stripe.charges.create({
          amount: payment.amount,
          currency: payment.currency,
          customer: customer.id,
        });

        if (charge.status === status) {
          const balanceTransactionId: string = charge.id;

          return balanceTransactionId;
        }

        return messege;
      }
}
