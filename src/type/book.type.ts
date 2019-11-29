import { ChangeEvent } from "react";

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
    type: string
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
    bookName: string,
    labelChangeName: boolean,
    authorDefaultOptions: SelectModel[],
    multiValue: string[],
    bookDescription: string,
    bookPrice: number,
    bookStatus: string,
    bookCurrency: string,
    bookType: string,
    isRoleUser: boolean,
    isEdit: boolean
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
    isCreated: boolean
}

export interface BookProps {
    bookDescription?: string,
    bookPrice?: number,
    bookStatus?: string,
    bookCurrency?: string,
    bookType?: string,
    bookName?: string,
    labelChangeName?: boolean,
    isCreated?: boolean,
    authorDefaultOptions?: SelectModel[],
    onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    onInputDescription: (event: ChangeEvent<HTMLTextAreaElement>) => void,
    onSelectStatusBook: (event: any) => void,
    onSelectCurrencyBook: (event: any) => void,
    onSelectAuthor: (event: any) => void,
}
