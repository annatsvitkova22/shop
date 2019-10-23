import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository, DeleteResult } from 'typeorm';

import { Payment } from 'src/entity';
import { UpdatePaymentModel, CreatePaymentModel } from 'src/models';
import { Enviroment, getEnv } from 'src/environment/environment';

const myEnvitonment: Enviroment = getEnv();

@Injectable()
export class PaymentService {

    constructor(
        @InjectRepository(Payment) private paymentRepository: Repository<Payment>) { }

    public async getPayments(): Promise<Payment[]> {
        const getPayments: Payment[] = await this.paymentRepository.find();

        return getPayments;
    }

    public async getUPaymentById(id: string): Promise<Payment> {
        const payment: UpdatePaymentModel = {};
        payment.id = id;
        const foundPayment: Payment = await this.paymentRepository.findOne(payment.id);

        return foundPayment;
    }

    public async createPayment(createPayment: CreatePaymentModel): Promise<string> {
        const payment: Payment = {};
        const transactionId: string = await this.charge(createPayment);
        payment.transactionId = transactionId;
        const savedPayment: Payment = await this.paymentRepository.save(payment);

        return(savedPayment.id);
    }

    public async updatePayment(updatePayment: UpdatePaymentModel): Promise<Payment> {
        const payment: Payment = {};
        payment.id = updatePayment.id;
        payment.transactionId = updatePayment.transactionId;
        const toUpdate: Payment = await this.paymentRepository.findOne(payment.id);
        toUpdate.transactionId = payment.transactionId;

        const savedPayment: Payment = await this.paymentRepository.save(toUpdate);

        return savedPayment;
      }

    public async deletePayment(paymentId: string): Promise<boolean|string> {
        const payment: Payment = {};
        payment.id = paymentId;
        const result: DeleteResult = await this.paymentRepository.delete(payment);
        if (result.affected === 0) {
            const messege: string = 'id not found';

            return messege;
        }
        return true;
    }

    public async charge(payment: CreatePaymentModel): Promise<string> {
        const status = 'succeeded';
        const messege = 'Error';
        const stripe = require('stripe')(myEnvitonment.stripeApiKey);
        const customer = await stripe.customers.create({
          email: payment.email,
          source: payment.source,
        });
        const charge = await stripe.charges.create({
          amount: payment.amount,
          description: payment.description,
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
