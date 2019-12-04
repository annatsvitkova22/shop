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
}
