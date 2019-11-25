export interface BookListProps {
    books: BookModel[],
}

export interface BookModel {
    isRemoved: boolean,
    id: string,
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

export interface BookPostState {
    book: BookModel,
    bookName: string,
    labelChangeName: string,
    isRoleUser: boolean
}

export interface BookListState {
    books: BookModel[],
    bookName: string,
    check?: boolean,
    isRoleUser?: boolean
}