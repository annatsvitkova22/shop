import React, { Component, ChangeEvent } from 'react';

import { RequestOptionsModel } from '../../../../type/author.type';
import { BookPostState, BookModel, AuthorModel, BookWithAuthorsModel, SelectModel } from '../../../../type/book.type';
import { Link } from 'react-router-dom';
import NewBook from '../new-book/new-book';

const BASE_PATH = 'https://192.168.0.104:443/printingEdition/';

class BookPost extends Component<any, BookPostState> {
    state: BookPostState = ({
        book: {
            isRemoved: false,
            id: '',
            name: '',
            description: '',
            price: 0,
            status: '',
            currency: '',
            type: ''
        },
        authorDefaultOptions: [],
        multiValue: [],
        authors: [],
        bookName: '',
        bookDescription: '',
        bookPrice: 0,
        bookStatus: '',
        bookCurrency: '',
        bookType: '',
        labelChangeName: false,
        isRoleUser: false,
        isEdit: false,
    });

    componentDidMount = (): void => {
        const { id } = this.props.match.params;
        this.requestGetBookWithAuthor(id);
        this.roleUser();
    }

    roleUser = (): void => {
        const token = localStorage.getItem('accessToken');
        const jwt = require('jsonwebtoken');
        const payload = jwt.decode(token);

        if (token) {
            if (payload.role === 'user') {
                this.setState({ isRoleUser: false });
            }
            if (payload.role === 'admin') {
                this.setState({ isRoleUser: true });
            }
        }
        if (!token) {
            this.setState({ isRoleUser: false });
        }
    }

    handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
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

    handleEdit = (): void => {
        this.setState({ isEdit: true });
    }

    handleEditBook = async (): Promise<void> => {
        const { book, bookName, authors, bookDescription, bookCurrency, bookPrice, bookStatus, bookType }: BookPostState = this.state;

        const eeditBook: BookWithAuthorsModel = {
            printingEdition: {
                id: book.id,
                name: bookName,
                description: bookDescription,
                price: bookPrice,
                status: bookStatus,
                currency: bookCurrency,
                type: bookType,
                isRemoved: book.isRemoved,
            },
            authors
        }

        const updatedBook = await this.requestEditBook(eeditBook);
        if (updatedBook) {
            this.setState({ labelChangeName: true });
        }
    }

    handleRemoveBook = (): void => {
        const { id } = this.props.match.params;
        this.requestRemoveBook(id);

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

    requestGetBookWithAuthor = (id: string): void => {
        const token: string | null = localStorage.getItem('accessToken');
        const headers: Headers = new Headers();
        headers.append('Authorization', 'Bearer ' + token);
        const options: RequestOptionsModel = {
            method: 'GET',
            headers,
        };

        const url = BASE_PATH + 'author/' + id;

        const request: Request = new Request(url, options);
        fetch(request)
            .then((res: Response) => res.json())
            .then((bookWithAuthor: BookWithAuthorsModel) => {
                this.setState({ book: bookWithAuthor.printingEdition, bookName: bookWithAuthor.printingEdition.name, bookCurrency: bookWithAuthor.printingEdition.currency, bookDescription: bookWithAuthor.printingEdition.description, bookPrice: bookWithAuthor.printingEdition.price, bookStatus: bookWithAuthor.printingEdition.status, bookType: bookWithAuthor.printingEdition.type, authors: bookWithAuthor.authors })
                const mas: BookPostState = {} as BookPostState;
                mas.authorDefaultOptions = [];
                for (let i = 0; i < bookWithAuthor.authors.length; i++) {
                    const sel: SelectModel = {} as SelectModel;
                    sel.value = bookWithAuthor.authors[i].id;
                    sel.label = bookWithAuthor.authors[i].name;

                    mas.authorDefaultOptions.push(sel);
                }
                this.setState({ authorDefaultOptions: mas.authorDefaultOptions })
            })
            .catch(error => error);
    }



    requestEditBook = async (data: BookWithAuthorsModel): Promise<BookModel> => {
        const token: string | null = localStorage.getItem('accessToken');
        const headers: Headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Bearer ' + token);
        const json: string = JSON.stringify(data);
        console.log(json);
        const options: RequestOptionsModel = {
            method: 'PUT',
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

    requestRemoveBook = (id: string): void => {
        const token: string | null = localStorage.getItem('accessToken');
        const headers: Headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Bearer ' + token);
        const options: RequestOptionsModel = {
            method: 'PUT',
            headers,
        };

        const url = BASE_PATH + id;
        const request: Request = new Request(url, options);
        fetch(request)
            .then((res: Response) => res.json())
            .then((book: BookModel) => this.setState({ book, bookName: '' }))
            .catch(error => error);
    }

    render() {
        const { bookName, book, labelChangeName, authorDefaultOptions, bookStatus, bookCurrency, bookType, bookPrice, bookDescription, isRoleUser, authors, isEdit } = this.state;
        console.log('value', this.state);
        return (
            <div className="book-post">
                {isRoleUser && isEdit && <NewBook onSelectStatusBook={this.handleSelectStatusBook} onSelectAuthor={this.handleSelectAuthor} bookName={bookName} labelChangeName={labelChangeName} bookStatus={bookStatus} onSelectCurrencyBook={this.handleSelectCurrencyBook} bookCurrency={bookCurrency} bookPrice={bookPrice} bookType={bookType} onInputDescription={this.handleInputDescription}  bookDescription={bookDescription} authorDefaultOptions={authorDefaultOptions} onInputChange={this.handleInputChange} />}
                {!isEdit && !book.isRemoved && <div>
                    <div>
                        <p><span>Name: </span> {bookName}</p>
                        <p><span>Authors: </span> {authors.map(({ name, id }) => (
                            <Link to={`/author/${id}`}><span>{name} </span></Link>))}</p>
                        <p><span>Description: </span>{bookDescription}</p>
                        <p><span>Type: </span> {bookType}</p>
                        <p><span>Status: </span>{bookStatus}</p>
                        <p><span>Price: </span> {bookPrice}</p>
                        <p><span>Currency: </span>{bookCurrency}</p>
                    </div>
                </div>}
                {isRoleUser && !isEdit && !book.isRemoved && <div className="button">
                    <button onClick={this.handleEdit} >Edit</button>
                    <button onClick={this.handleRemoveBook} >Remove</button>
                </div>}
                {book.isRemoved ? <label>Book {book.name} deleted</label> : <br />}
                {isEdit && <button onClick={this.handleEditBook} >Edit</button>}
            </div>
        );
    }
};

export default BookPost;