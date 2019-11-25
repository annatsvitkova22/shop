import React, { Component } from 'react';

import { RequestOptionsModel } from '../../../../type/author.type';
import { BookPostState, BookModel, EditBookModel } from '../../../../type/book.type';

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
        bookName: '',
        labelChangeName: '',
        isRoleUser: false
    });

    componentDidMount = (): void => {
        const { id } = this.props.match.params;
        this.requestGetBook(id);
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

        this.setState({
            bookName: value,
        });
    }

    handleEditBook = () => {
        const { book, bookName }: BookPostState = this.state;
        const editBook: EditBookModel = {
            id: book.id,
            name: bookName,
            description: book.description,
            price: book.price,
            status: book.status,
            currency: book.currency,
            type: book.type

        };
        this.requestEditBook(editBook);
        this.setState({ labelChangeName: 'Book changed' })
    }

    handleRemovaBook = (): void => {
        const { id } = this.props.match.params;
        this.requestRemoveBook(id);

    }

    requestGetBook = (id: string): void => {
        const token: string | null = localStorage.getItem('accessToken');
        const headers: Headers = new Headers();
        headers.append('Authorization', 'Bearer ' + token);
        const options: RequestOptionsModel = {
            method: 'GET',
            headers,
        };

        const url = BASE_PATH + 'Author/' + id;

        const request: Request = new Request(url, options);
        fetch(request)
            .then((res: Response) => res.json())
            .then((book: BookModel) => this.setState({ book, bookName: book.name }))
            .catch(error => error);
    }

    requestEditBook = (data: EditBookModel): void => {
        const token: string | null = localStorage.getItem('accessToken');
        const headers: Headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Bearer ' + token);
        const json: string = JSON.stringify(data);

        const options: RequestOptionsModel = {
            method: 'PUT',
            headers,
            body: json,
        };
        const request: Request = new Request(BASE_PATH, options);
        fetch(request)
            .then((res: Response) => res.json())
            .then((book: BookModel) => this.setState({ book }))
            .catch(error => error);
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
        const { bookName, book, labelChangeName, isRoleUser } = this.state;
        console.log(isRoleUser);
        return (
            <div className="book-post">
                {isRoleUser && <div className="edit-book">
                    <h2>Book</h2>
                    <div id='book-input-wrapper' className='book-input'>
                        <input
                            type='text'
                            value={bookName}
                            onChange={this.handleInputChange}
                        />
                        <br />
                        <label>{labelChangeName}</label>
                        <br />
                    </div>
                    {book.isRemoved && <label>Book {book.name} deleted</label>}
                </div>}

                <div>
                    <div>
                        <p><span>Name: </span> {bookName}</p>
                        <p><span>Description: </span>{book.description}</p>
                        <p><span>Type: </span> {book.type}</p>
                        <p><span>Status: </span>{book.status}</p>
                        <p><span>Price: </span> {book.price}</p>
                        <p><span>Currency: </span>{book.currency}</p>
                    </div>
                </div>
                {isRoleUser && <div className="button">
                    <button onClick={this.handleEditBook} >Edit</button>
                    <button onClick={this.handleRemovaBook} >Remove</button>
                </div>}
            </div>
        );
    }
};

export default BookPost;