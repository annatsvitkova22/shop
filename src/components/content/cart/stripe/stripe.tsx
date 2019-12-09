import React, { FunctionComponent } from 'react';
import StripeCheckout, { Token } from 'react-stripe-checkout';

import { PaymentCartProps } from '../../../../type/cart.type';


const PaymentCart: FunctionComponent<PaymentCartProps> = ({totalAmount, currencyCart, onCreateTransaction }) => (
      <StripeCheckout
        amount={totalAmount * 100}
        currency={currencyCart}
        description="Anuitex Product"
        image="https://anuitex.com/favicon-32x32.png"
        locale="auto"
        stripeKey="pk_test_FOgaUBjEe0xYxbdzj8QIKeiQ00epqvoqv2"
        token={(token: Token) => { onCreateTransaction(token) }}
      />
);

export default PaymentCart;
