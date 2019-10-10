import * as Stripe from 'stripe';
import { Injectable } from '@nestjs/common';

export const stripe = new Stripe('pk_test_XSnlijSGov6Iv10Mx3Ztj5S900cNuSpQu4');

@Injectable()
export class CustomersService {
  private readonly stripe: Stripe = stripe;

  async findAllCustomers(): Promise<Stripe.IList<Stripe.customers.ICustomer>>{
    const customers = await this.stripe.customers.list();
    return customers;
  }

  async findCustomer(id: string): Promise<Stripe.customers.ICustomer> {
    const customer = await this.stripe.customers.retrieve(id);
    return await customer;
  }

  async createCustomer(customerInfo: Stripe.customers.ICustomerCreationOptions ): Promise<Stripe.customers.ICustomer> {
    const customer = await this.stripe.customers.create(customerInfo);
    return customer;
  }

  async updateCustomer(id: string, customerInfo: Stripe.customers.ICustomerUpdateOptions): Promise<Stripe.customers.ICustomer> {
    const customer = await this.stripe.customers.update(id, customerInfo);
    return customer;

  }

  async deleteCustomer(id: string): Promise<Stripe.IDeleteConfirmation> {
    const deletetionConfirmation = await this.stripe.customers.del(id);
    return deletetionConfirmation;
  }
}
