import React, { Component } from 'react';
import Select, { } from "react-select";

import { CartModel, CartItemModel, CartState, PaymentModel, CreateTransactionModel, CreateOrderModel, CreateOrderItem } from '../../../../type/cart.type';

import './cart-table.css';
import PaymentCart from '../stripe/stripe';
import { RequestOptionsModel } from '../../../../type/author.type';
import { Token } from 'react-stripe-checkout';

const ORDER_PATH = 'https://192.168.0.104:443/order/';
const ORDER_ITEM_PATH = 'https://192.168.0.104:443/orderItem/';
const PAYMENT_PATH = 'https://192.168.0.104:443/payment/';

class CartTable extends Component<any, CartState> {
    state: CartState = ({
        isRoleUser: false,
        userId: '',
        totalAmount: 0,
        isOrderItem: false,
        currencyBookOptions: [
            { value: 'USD', label: 'USD' },
            { value: 'EUR', label: 'EUR' },
            { value: 'UAH', label: 'UAH' }],
        cart: {
            userId: '',
            printingEdition: []
        },
        isPay: false,
        currencyCart: 'USD',
        transactionId: ''
    });

    getUserCartItem = (): void => {
        const { userId } = this.state;
        const localStorageCart: string = localStorage.getItem('cart') as string;
        const cart: CartModel[] = JSON.parse(localStorageCart);
        const foundUserCart: CartModel = cart.find(item => item.userId === userId) as CartModel;
        if (foundUserCart) {
            this.setState({ cart: foundUserCart });
        }
    }

    componentDidMount = async (): Promise<void> => {
        await this.roleUser();
        this.getUserCartItem();
        this.getTotalAmount();
    }

    roleUser = async (): Promise<void> => {
        const token = localStorage.getItem('accessToken');
        const jwt = require('jsonwebtoken');
        const payload = jwt.decode(token);
        if (token) {
            if (payload.role === 'user') {
                await this.setState({ isRoleUser: true, userId: payload.userId });
            }
        }
        if (!token) {
            this.setState({ isRoleUser: true });
        }
    }

    handlePay = (): void => {
        this.setState({ isPay: true });
    }

    getTotalAmount = () => {
        const { cart } = this.state;

        let totalAmount: number = 0;
        cart.printingEdition.forEach((printingEdition: CartItemModel) => {
            totalAmount += printingEdition.printingEditionPrice;
        });

        this.setState({ totalAmount });
    }

    setToLocalStorage = (cart: CartModel) => {
        const { userId } = this.state;
        const localStorageCart: string = localStorage.getItem('cart') as string;
        const carts: CartModel[] = JSON.parse(localStorageCart);
        const foundUserCart: CartModel = carts.find(item => item.userId === userId) as CartModel;
        const foundUserCartIndex: number = carts.indexOf(foundUserCart);
        carts[foundUserCartIndex] = cart;
        const json: string = JSON.stringify(carts);
        localStorage.setItem('cart', json);
    }

    updateCart = (prevprintingEditionState: CartItemModel[]): void => {
        const { userId } = this.state;

        let updateCart: CartModel = {} as CartModel;
        updateCart = {
            userId: '',
            printingEdition: [],
        }
        updateCart.userId = userId;
        updateCart.printingEdition = prevprintingEditionState;
        this.setState({ cart: updateCart });
        this.getTotalAmount();
        this.setToLocalStorage(updateCart);
    }

    incrementCount = (id: string): void => {
        const { cart } = this.state;

        const printingEdition: CartItemModel = cart.printingEdition.find(item => item.printingEditionId === id) as CartItemModel;
        const printingEditionIndex: number = cart.printingEdition.indexOf(printingEdition);
        const prevprintingEditionState: CartItemModel[] = [...cart.printingEdition];
        const price: number = printingEdition.printingEditionPrice / printingEdition.printingEditionCount;
        printingEdition.printingEditionCount++;
        printingEdition.printingEditionPrice += price;
        prevprintingEditionState.splice(printingEditionIndex, 1, printingEdition);

        this.updateCart(prevprintingEditionState);
    }

    decrementCount = (id: string): void => {
        const { cart } = this.state;

        const printingEdition: CartItemModel = cart.printingEdition.find(item => item.printingEditionId === id) as CartItemModel;
        const printingEditionIndex: number = cart.printingEdition.indexOf(printingEdition);
        const prevprintingEditionState: CartItemModel[] = [...cart.printingEdition];
        const price: number = printingEdition.printingEditionPrice / printingEdition.printingEditionCount;

        if (printingEdition.printingEditionCount > 1) {
            printingEdition.printingEditionCount--;
            printingEdition.printingEditionPrice -= price;
        }
        prevprintingEditionState.splice(printingEditionIndex, 1, printingEdition);

        this.updateCart(prevprintingEditionState);
    }

    handleDeleteItem = (id: string): void => {
        const { cart } = this.state;
        const foundPrintingEdition: CartItemModel = cart.printingEdition.find(item => item.printingEditionId === id) as CartItemModel;
        const foundPrintingEditionIndex = cart.printingEdition.indexOf(foundPrintingEdition);
        if (foundPrintingEditionIndex !== -1) {
            cart.printingEdition.splice(foundPrintingEditionIndex, 1);
            this.setState({ cart });
            this.getTotalAmount();
            this.setToLocalStorage(cart);
        }
    }

    hangleSelectCurrencyBook = (event: any): void => {
        const value: any = event.value;

        const { cart } = this.state;

        let totalAmount: number = 0;
        cart.printingEdition.forEach((printingEdition: CartItemModel) => {
            let price: number = 0
            if (printingEdition.printingEditionCurrency === 'USD') {
                if (value === 'EUR') {
                    price = printingEdition.printingEditionPrice / 1.107;
                }
                if (value === 'UAH') {
                    price = printingEdition.printingEditionPrice * 23.94;
                }
            }
            if (printingEdition.printingEditionCurrency === 'EUR') {
                if (value === 'USD') {
                    price = printingEdition.printingEditionPrice * 1.107;
                }
                if (value === 'UAH') {
                    price = printingEdition.printingEditionPrice * 26.5;
                }
            }
            if (printingEdition.printingEditionCurrency === 'UAH') {
                if (value === 'EUR') {
                    price = printingEdition.printingEditionPrice / 26.5;
                }
                if (value === 'USD') {
                    price = printingEdition.printingEditionPrice / 23.94;

                }
            }
            printingEdition.printingEditionPrice = +price.toFixed(2);
            printingEdition.printingEditionCurrency = value;
            totalAmount += printingEdition.printingEditionPrice;
        });

        totalAmount = +totalAmount.toFixed(2);
        this.setState({ totalAmount, currencyCart: value });
    }

    handleCreateModelTransaction = async (token: Token): Promise<void> => {
        const { totalAmount, currencyCart, userId, cart } = this.state;

        const createdTransaction: CreateTransactionModel = {
            email: token.email,
            source: token.id,
            currency: currencyCart,
            amount: totalAmount * 100,
        }
        const transactionId: string = await this.createdTransaction(createdTransaction);
        if (transactionId) {
            let date: Date = new Date();
            const onlyDate: string = date.toUTCString();
            const createOrder: CreateOrderModel = {
                userId,
                date: onlyDate,
                paymentId: transactionId,
            }
            const orderId: string = await this.createOrder(createOrder);
            if(orderId) {
                const createOrderItem: CreateOrderItem = {
                    printingEdition: cart.printingEdition,
                    orderId
                }
                const createdOrderItem: boolean = await this.createOrderItem(createOrderItem);
                if(createdOrderItem) {
                    for (let i=0;i<cart.printingEdition.length;i++) {
                        cart.printingEdition.splice(i);
                    }   
                    this.setState({cart , totalAmount: 0})
                    this.setToLocalStorage(cart);
                }
            }
        }
    }

    createOrder = async (data: CreateOrderModel): Promise<string> => {
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

        const request: Request = new Request(ORDER_PATH, options);
        let orderId: string = '';
        await fetch(request)
            .then((res: Response) => res.json())
            .then((createdOrder: CreateOrderModel) => {
                if (createdOrder) {
                    orderId = createdOrder.id as string;
                }
            })
            .catch(error => error);

        return orderId;
    }

    createOrderItem = async (data: CreateOrderItem): Promise<boolean> => {
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

        const request: Request = new Request(ORDER_ITEM_PATH, options);
        let createdOrderItem: boolean = false;
        await fetch(request)
            .then((res: Response) => res.json())
            .then((createdItem: boolean) => {
                createdOrderItem = createdItem;
            })
            .catch(error => error);

        return createdOrderItem;
    }

    createdTransaction = async (data: CreateTransactionModel): Promise<string> => {
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
        let transactionId: string = '';
        await fetch(request)
            .then((res: Response) => res.json())
            .then((createdTransaction: PaymentModel) => {
                if (createdTransaction) {
                    transactionId = createdTransaction.id;
                    this.setState({ transactionId: createdTransaction.id })
                }
            })
            .catch(error => error);

        return transactionId;
    }

    render() {
        const { isRoleUser, totalAmount, isOrderItem, cart, currencyBookOptions, currencyCart, isPay } = this.state;

        return (
            <div className="content">
                {isRoleUser && !isOrderItem && <div className="cart-table">
                    <table className="table_blur">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Count</th>
                                <th>Currency</th>
                                <th>Amount</th>
                                <th></th>
                            </tr>
                        </thead>
                        {cart.printingEdition.map(({ printingEditionId, printingEditionName, printingEditionCurrency, printingEditionCount, printingEditionPrice }) => (
                            <tr key={printingEditionId}>
                                <th>{printingEditionName}</th>
                                <th>
                                    <button className="btn" onClick={() => this.incrementCount(printingEditionId)}>+</button>
                                    {printingEditionCount}
                                    <button className="btn" onClick={() => this.decrementCount(printingEditionId)}>-</button>
                                </th>
                                <th>{printingEditionCurrency}</th>
                                <th>{printingEditionPrice}</th>
                                <th><button className="button-create" onClick={() => this.handleDeleteItem(printingEditionId)}>delete</button></th>
                            </tr>
                        ))}
                        <tfoot>
                            <th>Currency:</th>
                            <th>
                                <Select
                                    options={currencyBookOptions}
                                    defaultValue={[currencyBookOptions[0]]}
                                    onChange={this.hangleSelectCurrencyBook}
                                />
                            </th>
                            <th>Total amount:</th>
                            <th>{totalAmount}</th>
                            <th><PaymentCart onCreateTransaction={this.handleCreateModelTransaction} currencyCart={currencyCart} totalAmount={totalAmount} /></th>
                        </tfoot>
                    </table>
                </div>}
            </div>
        );
    }
}

export default CartTable;