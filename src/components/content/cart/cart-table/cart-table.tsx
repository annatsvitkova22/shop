import React, { Component } from 'react';
import Select, { } from "react-select";

import { RequestOptionsModel } from '../../../../type/author.type';
import { CartModel, CartItemModel, CartState } from '../../../../type/cart.type';

import './cart-table.css';
import PaymentCart from '../stripe/stripe';

const ORDER_PATH = 'https://192.168.0.104:443/order/';

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
        currencyCart: 'USD'
    });

    /**
     *
     */
    // constructor(props: any) {
    //     super(props);

    //     const currentState = {
    //         isRoleUser: false,
    //         userId: '',
    //         totalAmount: 0,
    //         isOrderItem: false,
    //         cart: {
    //             userId: '',
    //             printingEdition: []
    //         },
    //     };

    //     this.state = currentState;
    // }

    getUserCartItem = (): void => {
        const { userId } = this.state;
        const localStorageCart: string = localStorage.getItem('cart') as string;
        const cart: CartModel[] = JSON.parse(localStorageCart);
        const foundUserCart: CartModel = cart.find(item => item.userId === userId) as CartModel;
        this.setState({ cart: foundUserCart });

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
        this.setState({isPay: true});
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

    updateCart = (prevprintingEditionState: CartItemModel[]) => {
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

    incrementCount = (id: string) => {
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

    decrementCount = (id: string) => {
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

    handleDeleteItem = (id: string) => {
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

    // getOrderItemsWithPrintingEdition = (userId: string): void => {
    //     const token: string | null = localStorage.getItem('accessToken');
    //     const headers: Headers = new Headers();
    //     headers.append('Authorization', 'Bearer ' + token);
    //     const options: RequestOptionsModel = {
    //         method: 'GET',
    //         headers,
    //     };
    //     let countMas: any = [];
    //     const url = ORDER_ITEM_PATH + userId;
    //     let totalAmount: number = 0;
    //     const request: Request = new Request(url, options);
    //     fetch(request)
    //         .then((res: Response) => res.json())
    //         .then((orderItems: OrderItemsWithPrintingEditionModel[]) => {

    //             if (!orderItems.length) {
    //                 this.deleteOrder(userId);
    //             }
    //             orderItems.forEach((orderItem) => {
    //                 totalAmount += orderItem.amount;
    //             });
    //             this.setState({ totalAmount, orderItems });
    //         })
    //         .catch(error => error);
    // }

    deleteOrder = (userId: string) => {
        const token: string | null = localStorage.getItem('accessToken');
        const headers: Headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Bearer ' + token);
        const options: RequestOptionsModel = {
            method: 'DELETE',
            headers,
        };

        const url: string = ORDER_PATH + userId;
        const request: Request = new Request(url, options);
        fetch(request)
            .then((res: Response) => res.json())
            .then((deleted: boolean) => this.setState({ isOrderItem: true }))
            .catch(error => error);
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
                            <th><PaymentCart currencyCart={currencyCart} totalAmount={totalAmount}/></th>
                        </tfoot>
                    </table>
                </div>}
            </div>
        );
    }
}

export default CartTable;