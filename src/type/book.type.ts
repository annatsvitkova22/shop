import { ChangeEvent } from "react";
import { CartModel } from "./cart.type";

export interface BookListProps {
    books: BookModel[],
}

export interface BookModel {
    isRemoved?: boolean,
    id?: string,
    name: string,
    description: string,
    price: number,
    status: string,
    currency: string,
    type: string,
    image?: string
}

export interface EditBookModel {
    id: string,
    name: string,
    description: string,
    price: number,
    status: string,
    currency: string,
    type: string
}

export interface AuthorModel {
    id: string,
    name: string,
    isRemoved: boolean,
}

export interface BookWithAuthorsModel {
    printingEdition: BookModel,
    authors: AuthorModel[]
}

export interface SelectModel {
    value: string,
    label: string
}

export interface BookPostState {
    book: BookModel,
    authors: AuthorModel[],
    labelChangeName: boolean,
    authorDefaultOptions: SelectModel[],
    multiValue: string[],
    isRoleUser: boolean,
    isEdit: boolean,
    isLoadImage: boolean,
    dataErrors: {
        bookName: string,
        bookType: string,
        bookPrice: string,
    },
    bookNameValid: boolean,
    bookTypeValid: boolean,
    bookPriceValid: boolean,
    dataValid: boolean,
}

export interface NewBookState {
    authorOptions: SelectModel[],
    typeBookOptions: SelectModel[],
    currencyBookOptions: SelectModel[],
}

export interface BookListState {
    books: BookModel[],
    authors: AuthorModel[],
    bookName: string,
    bookDescription: string,
    bookPrice: number,
    bookStatus: string,
    bookCurrency: string,
    bookType: string,
    check?: boolean,
    isRoleUser?: boolean,
    isCreate: boolean,
    isCreated: boolean,
    userId: string,
    orderId: string,
    cart: CartModel[],
    image: string,
    isLoadImage?: boolean,
    dataErrors: {
        bookName: string,
        bookType: string,
        bookPrice: string,
    },
    bookNameValid: boolean,
    bookTypeValid: boolean,
    bookPriceValid: boolean,
    dataValid: boolean,
    page: number,
    pageSize: number,
    countBook: number
}

export interface BookProps {
    bookName?: string,
    bookDescription?: string,
    bookPrice?: number,
    bookStatus?: string,
    bookCurrency?: string,
    bookType?: string,
    authorDefaultOptions?: SelectModel[],
    loadImage?: string,
    isLoadImage?: boolean,
    isCreate?: boolean,
    onValidateBookName: string,
    onValidateBookType: string,
    onValidateBookPrice: string,
    errorName: string,
    errorType: string,
    errorPrice: string,
    onCloseLoad?: () => void,
    onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    onInputDescription: (event: ChangeEvent<HTMLTextAreaElement>) => void,
    onSelectStatusBook: (event: any) => void,
    onSelectCurrencyBook: (event: any) => void,
    onSelectAuthor: (event: any) => void,
    onInputImageChange?: (event: React.ChangeEvent<HTMLInputElement>) => void,
}

export interface CreateOrderModel {
    date: string,
    userId: string,
}

export interface OrderModel{
    id: string,
    userId: string,
    date: Date,
    paymentId?: string,
    description?: string,
}

export interface CreateOrderItemModel {
    orderId: string;
    printingEditionId: string;
    currency: string;
    count: number;
    amount: number;
}

export interface OrderItemModel {
    id: string,
    pritingEditionId: string,
    amount: number,
    currency: string,
    count: number,
    orderId: string,
}

export interface OrderItemsWithPrintingEditionModel {
    id: string,
    amount: number,
    count: number,
    currency: string,
    pritingEditionId: string,
    orderId: string,
    userId: string,
}
