import React, { Component, ChangeEvent, ReactElement } from 'react';
import { Link } from "react-router-dom";

import { BookListProps, BookListState, BookModel } from "../../../../type/book.type";
import { RequestOptionsModel } from '../../../../type/author.type';

const BASE_PATH = 'https://192.168.0.104:443/printingEdition/';

class BookList extends Component<BookListProps, BookListState> {
    state: BookListState = ({
        books: [],
        bookName: '',
        check: false,
        isRoleUser: false,
    });

    roleUser = (): void => {
        const token = localStorage.getItem('accessToken');
        const jwt = require('jsonwebtoken');
        const payload = jwt.decode(token);

        if(token) {
            if (payload.role === 'user') {
                this.setState({isRoleUser: true});
            }
        }
        if(!token) { 
            this.setState({isRoleUser: true});
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

    componentDidMount = () => {
        this.roleUser();
        this.getAllBooksWithoutRemoved();
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
        const { books, isRoleUser } = this.state;
        return (
            <div className="book-input-wrapper">
                {!isRoleUser && <input
                    type='checkbox'
                    onChange={this.handleInputCheck}
                    className="isRemoved"
                />}
                {!isRoleUser &&<label>isRemoved</label>}
                <ul className="book-list">
                    {books.map(({ id, name }) => (
                        <li className="book-item" key={id}><Link to={`/book/${id}`}>
                            <span>{name}</span></Link>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
};

export default BookList;