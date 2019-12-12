import React, { Component, ChangeEvent } from 'react';
import 'antd/dist/antd.css';
import { Pagination } from 'antd';

import { BookListProps, BookListState, BookModel, BookPostState, AuthorModel, BookWithAuthorsModel } from "../../../../type/book.type";
import { RequestOptionsModel } from '../../../../type/author.type';
import NewBook from '../new-book/new-book';
import BookCart from '../book-cart/book-cart';
import { CartModel, CartItemModel } from '../../../../type/cart.type';

import './book-list.css';
import defaultImage from '../../../../image/default.jpg';
import Filter from '../../filter/filter';

const BASE_PATH = 'https://192.168.0.104:443/printingEdition/';

class BookList extends Component<BookListProps, BookListState> {
    state: BookListState = ({
        books: [],
        bookName: '',
        bookDescription: '',
        bookPrice: 0,
        bookStatus: 'yes',
        bookCurrency: 'USD',
        bookType: '',
        check: false,
        isRoleUser: false,
        isCreate: false,
        authors: [],
        isCreated: false,
        userId: '',
        orderId: '',
        cart: [],
        image: '',
        isLoadImage: false,
        dataErrors: {
            bookName: '',
            bookType: '',
            bookPrice: '',
        },
        bookNameValid: false,
        bookTypeValid: false,
        bookPriceValid: false,
        dataValid: false,
        page: 1,
        pageSize: 10,
        countBook: 0,
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
            this.getCountBooks();
            this.getAllBooks();
        }
        if (!check) {
            this.getCountBooksWithoutRemoved();
            this.getAllBooksWithoutRemoved();
        }
    }

    handleCreateBook = (event: any) => {
        event.preventDefault();
        this.setState({ isCreate: true });
    }

    handleAddBookToCart = async (id: string) => {
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
        const prevCartState: CartModel[] = cart;
        const foundUserCart: CartModel = prevCartState.find(item => item.userId === userId) as CartModel;

        if (foundUserCart) {
            const foundPrintingEdition: CartItemModel = foundUserCart.printingEdition.find(item => item.printingEditionId === id) as CartItemModel;

            if (foundPrintingEdition) {
                const foundPrintingEditionIndex: number = foundUserCart.printingEdition.indexOf(foundPrintingEdition);
                const prevPrintingEditionState: CartItemModel[] = [...foundUserCart.printingEdition];
                const price: number = foundPrintingEdition.printingEditionPrice / foundPrintingEdition.printingEditionCount;
                foundPrintingEdition.printingEditionCount++;
                foundPrintingEdition.printingEditionPrice += price;
                prevPrintingEditionState.splice(foundPrintingEditionIndex, 1, foundPrintingEdition)
                foundUserCart.printingEdition = prevPrintingEditionState;

            }
            if (!foundPrintingEdition) {
                const prevUserPrintingEdition: CartItemModel[] = [...foundUserCart.printingEdition]
                const foundUserCartIndex: number = cart.indexOf(foundUserCart);
                prevUserPrintingEdition.push(foundBook);
                foundUserCart.printingEdition = prevUserPrintingEdition;
                prevCartState.splice(foundUserCartIndex, 1, foundUserCart);
            }
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

    closeLoad = (): void => {
        this.setState({ isLoadImage: false, image: '' });
    }

    componentDidMount = () => {
        this.roleUser();
        this.getAllBooksWithoutRemoved();
        this.getCountBooksWithoutRemoved();
        const localStorageCart: string = localStorage.getItem('cart') as string;
        const cart: CartModel[] = JSON.parse(localStorageCart);
        if (cart) {
            this.setState({ cart });
        }
    }

    componentDidUpdate(prevProps: any, prevState: any) {
        const { book }: any = this.props;
        const { check, page, pageSize }: BookListState = this.state;

        if (book !== prevProps.book || page !== prevState.page || pageSize !== prevState.pageSize) {
            if (check) {
                this.getCountBooks();
                this.getAllBooks();
            }
            if (!check) {
                this.getCountBooksWithoutRemoved();
                this.getAllBooksWithoutRemoved();
            }
        }
    }

    handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const { value } = event.target;
        const { name } = event.target;
        switch (name) {
            case 'bookName':
                this.setState({ bookName: value },
                    () => { this.validateField(name, value) });
                break;
            case 'bookType':
                this.setState({ bookType: value },
                    () => { this.validateField(name, value) });
                break;
            case 'bookPrice':
                this.setState({ bookPrice: +value },
                    () => { this.validateField(name, value) });
                break;
            default:
                break;
        }
    }

    validateField(fieldName: string, value: any) {
        let { dataErrors, bookNameValid, bookTypeValid, bookPriceValid } = this.state;

        switch (fieldName) {
            case 'bookName':
                bookNameValid = value.length >= 4;
                dataErrors.bookName = bookNameValid ? '' : 'name book is too short';
                break;
            case 'bookType':
                bookTypeValid = value.length >= 2;
                dataErrors.bookType = bookTypeValid ? '' : 'type book is too short';
                break;
            case 'bookPrice':
                bookPriceValid = value > 0;
                dataErrors.bookPrice = bookPriceValid ? '' : 'price bokk is small';
                break;
            default:
                break;
        }

        this.setState({ dataErrors, bookNameValid, bookTypeValid, bookPriceValid }, this.validateForm);
    }

    validateForm() {
        const { bookNameValid, bookTypeValid, bookPriceValid } = this.state;
        this.setState({ dataValid: bookNameValid && bookTypeValid && bookPriceValid });
    }

    errorClass = (error: string) => {
        return (error.length === 0 ? '' : 'has-error');
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

    handleInputImageChange = (event: any): void => {
        event.preventDefault();
        let file = event.target.files[0];
        let reader: FileReader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            const loadImage: string = reader.result as string;
            this.setState({ image: loadImage, isLoadImage: true })
        };
    }

    handleSaveBook = async (event: any): Promise<void> => {
        event.preventDefault();
        const { bookName, image, authors, bookDescription, bookCurrency, bookPrice, bookStatus, bookType }: BookListState = this.state;

        const editBook: BookWithAuthorsModel = {
            printingEdition: {
                name: bookName,
                description: bookDescription,
                price: bookPrice,
                status: bookStatus,
                currency: bookCurrency,
                type: bookType,
                image
            },
            authors
        }

        const savedBook = await this.saveBookwithAuthor(editBook);
        if (savedBook) {
            this.getAllBooksWithoutRemoved();
            this.setState({ isCreate: false, image: '', isLoadImage: false });
        }
    }

    handleShowSizeChange = (page: number, pageSize: number ): void => {
        this.setState({ page, pageSize});
    }

    handleChangePagination = (page: number, pageSize: number | undefined): void => {
        this.setState({ page, pageSize: pageSize as number });
    }

    getCountBooksWithoutRemoved = (): void => {
        const headers: Headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const options: RequestOptionsModel = {
            method: 'GET',
            headers,
        };

        const url = BASE_PATH + 'countByIsRemoved';
        const request: Request = new Request(url, options);
        fetch(request)
            .then((res: Response) => res.json())
            .then((count: number) => this.setState({ countBook: count }))
            .catch(error => error);
    }

    getCountBooks = (): void => {
        const headers: Headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const options: RequestOptionsModel = {
            method: 'GET',
            headers,
        };

        const url = BASE_PATH + 'count';
        const request: Request = new Request(url, options);
        fetch(request)
            .then((res: Response) => res.json())
            .then((count: number) => this.setState({ countBook: count }))
            .catch(error => error);
    }

    saveBookwithAuthor = async (data: BookWithAuthorsModel): Promise<BookModel> => {
        const token: string | null = localStorage.getItem('accessToken');
        const headers: Headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Bearer ' + token);
        const json: string = JSON.stringify(data);

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
        const { page, pageSize } = this.state;
        const headers: Headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const options: RequestOptionsModel = {
            method: 'GET',
            headers,
        };

        let masBook: BookModel[] = {} as BookModel[];
        masBook = [];
        const url = BASE_PATH + 'isRemoved/' + pageSize + '/' + (page - 1) * pageSize;
        const request: Request = new Request(url, options);
        fetch(request)
            .then((res: Response) => res.json())
            .then((books: BookModel[]) => {
                for (let i = 0; i < books.length; i++) {
                    let book: BookModel = {} as BookModel;
                    book = books[i];
                    if (!book.image) {
                        book.image = defaultImage;
                    }

                    masBook.push(book);
                }
                this.setState({ books: masBook });
            })
            .catch(error => error);
    }

    getAllBooks = (): void => {
        const { page, pageSize } = this.state;
        const headers: Headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const options: RequestOptionsModel = {
            method: 'GET',
            headers,
        };

        let masBook: BookModel[] = {} as BookModel[];
        masBook = [];
        const url = BASE_PATH + 'all/' + pageSize + '/' + (page - 1) * pageSize;
        const request: Request = new Request(url, options);
        fetch(request)
            .then((res: Response) => res.json())
            .then((books: BookModel[]) => {
                for (let i = 0; i < books.length; i++) {
                    let book: BookModel = {} as BookModel;
                    book = books[i];
                    if (!book.image) {
                        book.image = defaultImage;
                    }

                    masBook.push(book);
                }
                this.setState({ books: masBook })
            })
            .catch(error => error);
    }

    render() {
        const { books, countBook, dataValid, isCreated, isRoleUser, isCreate, image, isLoadImage, dataErrors } = this.state;

        return (
            <div className="content">
                <div className="book-input-wrapper">
                    {!isCreate && <div>
                        <div className="hover-table-layout">
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
                        <Filter/>
                        <div className="hover-table-layout">
                            {books.map(({ id, name, price, currency, type, image }) => (
                                <BookCart isRoleUser={isRoleUser} onAddToCart={this.handleAddBookToCart} image={image} id={id} name={name} price={price} currency={currency} type={type} />
                            ))}

                        </div>
                        <div className="pagination">
                            <Pagination
                                showSizeChanger
                                onShowSizeChange={this.handleShowSizeChange}
                                onChange={this.handleChangePagination}
                                defaultCurrent={1}
                                total={countBook}
                            />
                        </div>
                    </div>}
                    {isCreate && <div>
                        <NewBook onValidateBookName={this.errorClass(dataErrors.bookName)} errorPrice={dataErrors.bookPrice} errorType={dataErrors.bookType} errorName={dataErrors.bookName} onValidateBookType={this.errorClass(dataErrors.bookType)} onValidateBookPrice={this.errorClass(dataErrors.bookPrice)} isCreate={isCreate} onCloseLoad={this.closeLoad} isLoadImage={isLoadImage} loadImage={image} onInputImageChange={this.handleInputImageChange} onSelectStatusBook={this.handleSelectStatusBook} onSelectCurrencyBook={this.handleSelectCurrencyBook} onInputDescription={this.handleInputDescription} onSelectAuthor={this.handleSelectAuthor} onInputChange={this.handleInputChange} />
                        {!isCreated && <button className="button" onClick={this.handleSaveBook} disabled={!dataValid}>
                            <span className="button__line button__line--top"></span>
                            <span className="button__line button__line--right"></span>
                            <span className="button__line button__line--bottom"></span>
                            <span className="button__line button__line--left"></span>
                            Create
                        </button>}
                    </div>}
                </div>
            </div>
        );
    }
};

export default BookList;
