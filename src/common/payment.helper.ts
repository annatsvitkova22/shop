import { CreatePaymentModel } from 'src/models';

const keySecret = 'sk_test_4kwhS3Jsc0uRQZow1C7Q7b6I002UgJ1GHf';
const stripe = require('stripe')(keySecret);
const status = 'succeeded';

export class PaymentHelper {
    public async charge(payment: CreatePaymentModel): Promise<string> {
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
