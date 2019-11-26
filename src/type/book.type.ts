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
    labelChangeName: string,
    filterOptions: SelectModel[] ,
    multiValue: string[],
    isRoleUser: boolean,
    isEdit: boolean
}

export interface BookListState {
    books: BookModel[],
    bookName: string,
    check?: boolean,
    isRoleUser?: boolean
}