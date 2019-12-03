import React, { Component } from 'react';

import './cart-table.css';
import { RequestOptionsModel } from '../../../../type/author.type';
import { OrderItemsWithPrintingEditionModel, OrderItemModel } from '../../../../type/book.type';

const ORDER_ITEM_PATH = 'https://192.168.0.104:443/orderItem/';
const ORDER_PATH = 'https://192.168.0.104:443/order/';

class CartTable extends Component<any, any> {
    state = ({
        orderItems: [{
            id: '',
            name: '',
            count: 0,
            amount: 0,
            currency: ''
        }],
        isRoleUser: false,
        userId: '',
        totalAmount: 0,
        isOrderItem: false,
    });

    componentDidMount = () => {
        this.roleUser();

    }

    roleUser = (): void => {
        const token = localStorage.getItem('accessToken');
        const jwt = require('jsonwebtoken');
        const payload = jwt.decode(token);
        if (token) {
            if (payload.role === 'user') {

                this.setState({ isRoleUser: true, userId: payload.userId });
                this.getOrderItemsWithPrintingEdition(payload.userId);
            }
        }
        if (!token) {
            this.setState({ isRoleUser: true });
        }
    }

    handlePay = () => {

    }

    incrementCount = (id: string) => {
        const { orderItems } = this.state;

        const orderItem: any = orderItems.find(item => item.id === id);
        const price = orderItem.amount / orderItem.count;
        const orderItemIndex: number = orderItems.indexOf(orderItem);
        const prevOrderItemsState: any[] = [...orderItems];
        orderItem.count++;
        orderItem.amount += price;
        prevOrderItemsState.splice(orderItemIndex, 1, orderItem);
        let totalAmount: number = 0;
        orderItems.forEach((orderItem) => {
            totalAmount += orderItem.amount;
        });
        this.setState({orderItems: prevOrderItemsState, totalAmount });
    }

    decrementCount = (id: string) => {
        const { orderItems } = this.state;

        const orderItem: any = orderItems.find(item => item.id === id);
        const price = orderItem.amount / orderItem.count
        const orderItemIndex: number = orderItems.indexOf(orderItem);
        const prevOrderItemsState: any[] = [...orderItems];

        if( orderItem.count > 1 ) {
            orderItem.count--;
            orderItem.amount -= price;
        }
        let totalAmount: number = 0;
        orderItems.forEach((orderItem) => {
            totalAmount += orderItem.amount;
        });
        prevOrderItemsState.splice(orderItemIndex, 1, orderItem);
        this.setState({orderItems: prevOrderItemsState, totalAmount});
    }

    handleDeleteItem = (id: string) => {
        const { userId } = this.state;
        const token: string | null = localStorage.getItem('accessToken');
        const headers: Headers = new Headers();
        headers.append('Authorization', 'Bearer ' + token);
        const options: RequestOptionsModel = {
            method: 'DELETE',
            headers,
        };

        const url = ORDER_ITEM_PATH + id;
        const request: Request = new Request(url, options);
        fetch(request)
            .then((res: Response) => res.json())
            .then((deleted: boolean) => {
                if (deleted) {
                    this.getOrderItemsWithPrintingEdition(userId);
                }
            })
            .catch(error => error);
    }

    getOrderItemsWithPrintingEdition = (userId: string): void => {
        const token: string | null = localStorage.getItem('accessToken');
        const headers: Headers = new Headers();
        headers.append('Authorization', 'Bearer ' + token);
        const options: RequestOptionsModel = {
            method: 'GET',
            headers,
        };
        let countMas: any = [];
        const url = ORDER_ITEM_PATH + userId;
        let totalAmount: number = 0;
        const request: Request = new Request(url, options);
        fetch(request)
            .then((res: Response) => res.json())
            .then((orderItems: OrderItemsWithPrintingEditionModel[]) => {

                if (!orderItems.length) {
                    this.deleteOrder(userId);
                }
                orderItems.forEach((orderItem) => {
                    totalAmount += orderItem.amount;
                });
                this.setState({ totalAmount, orderItems });
            })
            .catch(error => error);
    }

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
        const { orderItems, isRoleUser, totalAmount, isOrderItem } = this.state;
        console.log(orderItems);
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
                        {orderItems.map(({ id, name, count, currency, amount }) => (
                            <tr key={id}>
                                <th>{name}</th>
                                <th>
                                    <button className="btn" onClick={() => this.incrementCount(id)}>+</button>
                                    {count}
                                    <button className="btn" onClick={() => this.decrementCount(id)}>-</button>
                                </th>
                                <th>{currency}</th>
                                <th>{amount}</th>
                                <th><button className="button-create" onClick={() => this.handleDeleteItem(id)}>delete</button></th>
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