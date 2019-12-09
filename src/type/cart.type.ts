import { BookModel, SelectModel } from "./book.type";
import { Token } from "react-stripe-checkout";

export interface CartModel {
    userId: string,
    printingEdition: CartItemModel[],
}

export interface CartItemModel {
    printingEditionId: string,
    printingEditionName: string,
    printingEditionCurrency: string,
    printingEditionCount: number,
    printingEditionPrice: number
}

export interface CartState {
    isRoleUser: boolean,
    userId: string,
    totalAmount: number,
    isOrderItem: boolean,
    cart: CartModel,
    currencyBookOptions: SelectModel[],
    isPay: boolean,
    currencyCart: string,
    transactionId: string,
}

export interface PaymentModel {
    id: string;
    transactionId: string
}

export interface CreateTransactionModel {
    email: string,
    source: string,
    currency: string,
    amount: number
}

export interface PaymentCartState {
    transactionId: string
}

export interface PaymentCartProps {
    totalAmount: number,
    currencyCart: string
    onCreateTransaction: (id: Token) => void,
}

export interface CreateOrderModel {
    id?: string,
    userId: string,
    date: string;
    paymentId: string,
}

export interface CreateOrderItem {
    printingEdition: CartItemModel[],
    orderId: string
}
