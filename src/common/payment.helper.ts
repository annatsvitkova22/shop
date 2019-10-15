const keySecret = 'sk_test_4kwhS3Jsc0uRQZow1C7Q7b6I002UgJ1GHf';

const stripe = require('stripe')(keySecret);

export class PaymentHelper {
    public async Charge(newEmail: string, newSource: string, newDescription: string, newCurrency: string, newAmount: number): Promise<string> {
        const customer = await stripe.customers.create({
            email: newEmail,
            source: newSource,
          });
        const charge = await stripe.charges.create({
            amount: newAmount,
            description: newDescription,
            currency: newCurrency,
            customer: customer.id,
          });

        if (charge.status === 'succeeded') {
            const balanceTransactionId = charge.id;

            return balanceTransactionId;
        }

        return 'Error';
    }
}
