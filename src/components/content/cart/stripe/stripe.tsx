import React, { Component } from 'react';
import StripeCheckout, { Token } from 'react-stripe-checkout';
import { RequestOptionsModel } from '../../../../type/author.type';
import { PaymentModel, CreateTransactionModel, PaymentCartState, PaymentCartProps } from '../../../../type/cart.type';

const PAYMENT_PATH = 'https://192.168.0.104:443/payment/';

class PaymentCart extends Component<PaymentCartProps, PaymentCartState> {
  state = ({
    transactionId: ''
  });

  handleCreateModelTransaction = (token: Token) => {
    const { totalAmount, currencyCart } = this.props;

    const createdTransaction: CreateTransactionModel = {
      email: token.email,
      source: token.id,
      currency: currencyCart,
      amount: totalAmount * 100,
    }
    this.createdTransaction(createdTransaction);
  }

  createdTransaction = (data: any): void => {
    const token: string | null = localStorage.getItem('accessToken');
    const headers: Headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + token);
    const json: string = JSON.stringify(data);

    const options: RequestOptionsModel = {
      method: 'POST',
      headers,
      body: json,
    };

    const request: Request = new Request(PAYMENT_PATH, options);
    fetch(request)
      .then((res: Response) => res.json())
      .then((createdTransaction: PaymentModel) => {
        if (createdTransaction) {
          this.setState({ transactionId: createdTransaction.id })
        }
      })
      .catch(error => error);

  }
  render() {
    const { totalAmount, currencyCart } = this.props;

    return (
      <StripeCheckout
        amount={totalAmount * 100}
        currency={currencyCart}
        description="Anuitex Product"
        image="https://anuitex.com/favicon-32x32.png"
        locale="auto"
        stripeKey="pk_test_FOgaUBjEe0xYxbdzj8QIKeiQ00epqvoqv2"
        token={(token: Token) => {
          console.log(token);
          this.handleCreateModelTransaction(token)
        }}
      />
    );
  }
}

export default PaymentCart;
