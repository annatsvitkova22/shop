import React, { Component } from 'react';

import './cart-table.css';
import { RequestOptionsModel } from '../../../../type/author.type';
import { OrderItemsWithPrintingEditionModel } from '../../../../type/book.type';
import { CartModel, CartItemModel, CartState } from '../../../../type/cart.type';

const ORDER_ITEM_PATH = 'https://192.168.0.104:443/orderItem/';
const ORDER_PATH = 'https://192.168.0.104:443/order/';

class CartTable extends Component<any, CartState> {
    state: CartState = ({
        isRoleUser: false,
        userId: '',
        totalAmount: 0,
        isOrderItem: false,
        cart: {
            userId: '',
            printingEdition: []
        },
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
    }

    roleUser = async (): Promise<void> => {
        const token = localStorage.getItem('accessToken');
        const jwt = require('jsonwebtoken');
        const payload = jwt.decode(token);
        if (token) {
            if (payload.role === 'user') {

                await this.setState({ isRoleUser: true, userId: payload.userId });
                // this.getOrderItemsWithPrintingEdition(payload.userId);
            }
        }
        if (!token) {
            this.setState({ isRoleUser: true });
        }
    }

    handlePay = (): void => {

    }

    getTotalAmount = (prevprintingEditionState: CartItemModel[]) => {
        const { cart, userId } = this.state;

        let totalAmount: number = 0;
        cart.printingEdition.forEach((printingEdition: CartItemModel) => {
            totalAmount += printingEdition.printingEditionPrice;
        });
        let updateCard: CartModel = {} as CartModel;
        updateCard = {
            userId: '',
            printingEdition: [],
        }
        updateCard.userId = userId;
        updateCard.printingEdition = prevprintingEditionState;
        this.setState({ cart: updateCard, totalAmount });
    }

    incrementCount = (id: string) => {
        const { cart } = this.state;
    
        //const book: any[] = printingEdition;
        const printingEdition: CartItemModel = cart.printingEdition.find(item => item.printingEditionId === id) as CartItemModel;
        const printingEditionIndex: number = cart.printingEdition.indexOf(printingEdition);
        const prevprintingEditionState: CartItemModel[] = [...cart.printingEdition];
        printingEdition.printingEditionCount++;
        printingEdition.printingEditionPrice += printingEdition.printingEditionPrice;
        prevprintingEditionState.splice(printingEditionIndex, 1, printingEdition);

        this.getTotalAmount(prevprintingEditionState);


        // const orderItem: any = orderItems.find(item => item.id === id);
        // const price = orderItem.amount / orderItem.count;
        // const orderItemIndex: number = orderItems.indexOf(orderItem);
        // const prevOrderItemsState: any[] = [...orderItems];
        // orderItem.count++;
        // orderItem.amount += price;
        // prevOrderItemsState.splice(orderItemIndex, 1, orderItem);
        // let totalAmount: number = 0;
        // orderItems.forEach((orderItem) => {
        //     totalAmount += orderItem.amount;
        // });
        // this.setState({ orderItems: prevOrderItemsState, totalAmount });
    }

    decrementCount = (id: string) => {
        //const { orderItems } = this.state;

        // const orderItem: any = orderItems.find(item => item.id === id);
        // const price = orderItem.amount / orderItem.count
        // const orderItemIndex: number = orderItems.indexOf(orderItem);
        // const prevOrderItemsState: any[] = [...orderItems];

        // if (orderItem.count > 1) {
        //     orderItem.count--;
        //     orderItem.amount -= price;
        // }
        // let totalAmount: number = 0;
        // orderItems.forEach((orderItem) => {
        //     totalAmount += orderItem.amount;
        // });
        // prevOrderItemsState.splice(orderItemIndex, 1, orderItem);
        // this.setState({ orderItems: prevOrderItemsState, totalAmount });
    }

    handleDeleteItem = (id: string) => {
        // const { userId } = this.state;
        // const token: string | null = localStorage.getItem('accessToken');
        // const headers: Headers = new Headers();
        // headers.append('Authorization', 'Bearer ' + token);
        // const options: RequestOptionsModel = {
        //     method: 'DELETE',
        //     headers,
        // };

        // const url = ORDER_ITEM_PATH + id;
        // const request: Request = new Request(url, options);
        // fetch(request)
        //     .then((res: Response) => res.json())
        //     .then((deleted: boolean) => {
        //         if (deleted) {
        //             this.getOrderItemsWithPrintingEdition(userId);
        //         }
        //     })
        //     .catch(error => error);
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
        const { isRoleUser, totalAmount, isOrderItem, cart } = this.state;

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
                            <th></th>
                            <th></th>
                            <th>Total amount:</th>
                            <th>{totalAmount}</th>
                            <th><button className="button-create" onClick={this.handlePay}>Pay</button></th>
                        </tfoot>
                    </table>
                </div>}
            </div>
        );
    }
}

export default CartTable;