import React, { Component, ChangeEvent } from 'react';

import { BookListProps, BookListState, BookModel, BookPostState, AuthorModel, BookWithAuthorsModel, CreateOrderModel, OrderModel, CreateOrderItemModel, OrderItemModel, OrderItemsWithPrintingEditionModel } from "../../../../type/book.type";
import { RequestOptionsModel } from '../../../../type/author.type';
import NewBook from '../new-book/new-book';
import BookCart from '../book-cart/book-cart';

import './book-list.css';
import { CartModel, CartItemModel } from '../../../../type/cart.type';
import { threadId } from 'worker_threads';

const BASE_PATH = 'https://192.168.0.104:443/printingEdition/';
const ORDER_PATH = 'https://192.168.0.104:443/order/';
const ORDER_ITEM_PATH = 'https://192.168.0.104:443/orderItem/';

class BookList extends Component<BookListProps, BookListState> {
    state: BookListState = ({
        books: [],
        bookName: '',
        bookDescription: '',
        bookPrice: 0,
        bookStatus: '',
        bookCurrency: '',
        bookType: '',
        check: false,
        isRoleUser: false,
        isCreate: false,
        authors: [],
        isCreated: false,
        userId: '',
        orderId: '',
        cart: [],
    });

    roleUser = (): void => {
        const token = localStorage.getItem('accessToken');
        const jwt = require('jsonwebtoken');
        const payload = jwt.decode(token);
        if (token) {
            if (payload.role === 'user') {

                this.setState({ isRoleUser: true, userId: payload.userId });
            }
        }
        if (!token) {
            this.setState({ isRoleUser: true });
        }
    }

    handleInputCheck = (event: ChangeEvent<HTMLInputElement>): void => {
        const check = event.target.checked;
        this.setState({ check })
        if (check) {
            this.getAllBooks();
        }
        if (!check) {
            this.getAllBooksWithoutRemoved();
        }
    }

    handleCreateBook = (event: any) => {
        event.preventDefault();
        this.setState({ isCreate: true });
    }

    handleAddBookToCart = async (id: any) => {
        const { userId, books, cart } = this.state;

        const foundBook: CartItemModel = {} as CartItemModel;
        books.forEach((book) => {
            if (book.id === id) {
                foundBook.printingEditionId = book.id as string;
                foundBook.printingEditionName = book.name
                foundBook.printingEditionCurrency = book.currency;
                foundBook.printingEditionPrice = book.price;
                foundBook.printingEditionCount = 1;
            }
        });
        const prevCartState: CartModel[] = [...cart];
        const foundUserCart: CartModel = prevCartState.find(item => item.userId === userId) as CartModel;
        if (foundUserCart) {
            const prevUserPrintingEdition: CartItemModel[] = [...foundUserCart.printingEdition]
            const foundUserCartIndex: number = cart.indexOf(foundUserCart);
            prevUserPrintingEdition.push(foundBook);
            foundUserCart.printingEdition = prevUserPrintingEdition;
            prevCartState.splice(foundUserCartIndex, 1, foundUserCart);
        }
        if (!foundUserCart) {
            let newCard: CartModel = {} as CartModel;
            newCard = {
                userId: '',
                printingEdition: [],
            }
            newCard.userId = userId;
            newCard.printingEdition.push(foundBook);
            prevCartState.push(newCard);
        }
        this.setState({ cart: prevCartState });
        const json: string = JSON.stringify(prevCartState);
        localStorage.setItem('cart', json);
    }

    componentDidMount = () => {
        this.roleUser();
        this.getAllBooksWithoutRemoved();
        const localStorageCart: string = localStorage.getItem('cart') as string;
        const cart: CartModel[] = JSON.parse(localStorageCart);
        this.setState({ cart });
    }

    componentDidUpdate(prevProps: any) {
        const { book }: any = this.props;
        const { check }: BookListState = this.state;

        if (book !== prevProps.book) {
            if (check) {
                this.getAllBooks();
            }
            if (!check) {
                this.getAllBooksWithoutRemoved();
            }
        }
    }

    handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const { value } = event.target;
        const { name } = event.target;
        switch (name) {
            case 'bookName':
                this.setState({ bookName: value });
                break;
            case 'bookType':
                this.setState({ bookType: value });
                break;
            case 'bookPrice':
                this.setState({ bookPrice: +value });
                break;
            default:
                break;
        }
    }

    handleSelectAuthor = (event: any): void => {
        const value: any = event;
        const mas: BookPostState = {} as BookPostState;
        mas.authors = [];
        if (value) {
            for (let i = 0; i < value.length; i++) {
                const author: AuthorModel = {} as AuthorModel;
                author.name = value[i].label;
                author.id = value[i].value;
                author.isRemoved = false;

                mas.authors.push(author);
            }
        }
        this.setState({ authors: mas.authors })
    }

    handleSelectStatusBook = (event: any): void => {
        const value: any = event.value;

        this.setState({
            bookStatus: value
        });
    }

    handleSelectCurrencyBook = (event: any): void => {
        const value: any = event.value;

        this.setState({
            bookCurrency: value
        });
    }

    handleInputDescription = (event: ChangeEvent<HTMLTextAreaElement>): void => {
        const { value } = event.target;

        this.setState({
            bookDescription: value,
        });
    }

    handleSaveBook = async (event: any): Promise<void> => {
        event.preventDefault();
        const { bookName, authors, bookDescription, bookCurrency, bookPrice, bookStatus, bookType }: BookListState = this.state;

        const eeditBook: BookWithAuthorsModel = {
            printingEdition: {
                name: bookName,
                description: bookDescription,
                price: bookPrice,
                status: bookStatus,
                currency: bookCurrency,
                type: bookType,
            },
            authors
        }

        const savedBook = await this.saveBookwithAuthor(eeditBook);
        if (savedBook) {
            this.setState({ isCreated: true });
        }
    }

    saveBookwithAuthor = async (data: BookWithAuthorsModel): Promise<BookModel> => {
        const token: string | null = localStorage.getItem('accessToken');
        const headers: Headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Bearer ' + token);
        const json: string = JSON.stringify(data);
        console.log(json);
        const options: RequestOptionsModel = {
            method: 'POST',
            headers,
            body: json,
        };

        let book: BookModel = {} as BookModel;
        const request: Request = new Request(BASE_PATH, options);
        await fetch(request)
            .then((res: Response) => res.json())
            .then((cratedBook: BookModel) => book = cratedBook)
            .catch(error => error);

        return book;
    }

    getAllBooksWithoutRemoved = (): void => {
        const token: string | null = localStorage.getItem('accessToken');
        const headers: Headers = new Headers();
        headers.append('Authorization', 'Bearer ' + token);
        const options: RequestOptionsModel = {
            method: 'GET',
            headers,
        };

        const url = BASE_PATH + 'isRemoved';
        const request: Request = new Request(url, options);
        fetch(request)
            .then((res: Response) => res.json())
            .then((books: BookModel[]) => this.setState({ books }))
            .catch(error => error);
    }

    getAllBooks = (): void => {
        const token: string | null = localStorage.getItem('accessToken');
        const headers: Headers = new Headers();
        headers.append('Authorization', 'Bearer ' + token);
        const options: RequestOptionsModel = {
            method: 'GET',
            headers,
        };

        const url = BASE_PATH + 'all';
        const request: Request = new Request(url, options);
        fetch(request)
            .then((res: Response) => res.json())
            .then((books: BookModel[]) => this.setState({ books }))
            .catch(error => error);
    }

    render() {
        const { books, isCreated, isRoleUser, isCreate } = this.state;
        console.log(this.state);
        return (
            <div className="content">
                <div className="book-input-wrapper">
                    {!isCreate && <div>
                        <div className="title">
                            {!isRoleUser && <input
                                type='checkbox'
                                onChange={this.handleInputCheck}
                                className="option-input"
                            />}
                            {!isRoleUser && <label>isRemoved</label>}
                            {!isRoleUser && <a href="#" className="button-create" onClick={this.handleCreateBook}>
                                <span className="button__line button__line--top"></span>
                                <span className="button__line button__line--right"></span>
                                <span className="button__line button__line--bottom"></span>
                                <span className="button__line button__line--left"></span>
                                Create book
                        </a>}
                        </div>
                        <div className="hover-table-layout">
                            {books.map(({ id, name, price, currency, type }) => (
                                <BookCart isRoleUser={isRoleUser} onAddToCart={this.handleAddBookToCart} id={id} name={name} price={price} currency={currency} type={type} />
                            ))}

                        </div>
                    </div>}
                    {isCreate && <div>
                        <NewBook isCreated={isCreated} onSelectStatusBook={this.handleSelectStatusBook} onSelectCurrencyBook={this.handleSelectCurrencyBook} onInputDescription={this.handleInputDescription} onSelectAuthor={this.handleSelectAuthor} onInputChange={this.handleInputChange} />
                        {!isCreated && <a href="#" className="button" onClick={this.handleSaveBook}>
                            <span className="button__line button__line--top"></span>
                            <span className="button__line button__line--right"></span>
                            <span className="button__line button__line--bottom"></span>
                            <span className="button__line button__line--left"></span>
                            Create
                        </a>}
                    </div>}
                </div>
            </div>
        );
    }
};

export default BookList;
