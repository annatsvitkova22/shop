import { CreatePaymentModel } from 'src/models';
import { Enviroment, getEnv } from 'src/environment/environment';

const myEnvitonment: Enviroment = getEnv();

export class PaymentHelper {
  public async charge(payment: CreatePaymentModel): Promise<string> {
    const status = 'succeeded';
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
      const balanceTransactionId = charge.id;

      return balanceTransactionId;
    }

    return 'Error';
  }
}
