import { BookModel, SelectModel } from "./book.type";

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
}