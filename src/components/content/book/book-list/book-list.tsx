import React, { Component, ChangeEvent } from 'react';
import { Link } from "react-router-dom";

import { BookListProps, BookListState, BookModel, BookPostState, AuthorModel, BookWithAuthorsModel } from "../../../../type/book.type";
import { RequestOptionsModel } from '../../../../type/author.type';
import NewBook from '../new-book/new-book';

const BASE_PATH = 'https://192.168.0.104:443/printingEdition/';

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
        isCreated: false
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

    handleCreateBook = () => {
        this.setState({isCreate: true});
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

    handleSaveBook = async (): Promise<void> => {
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
            <div className="book-input-wrapper">
                {!isCreate && <div>
                    {!isRoleUser && <input
                        type='checkbox'
                        onChange={this.handleInputCheck}
                        className="isRemoved"
                    />}
                    {!isRoleUser &&<label>isRemoved</label>}
                    {!isRoleUser && <button onClick={this.handleCreateBook}>Create book</button>}
                    <ul className="book-list">
                        {books.map(({ id, name }) => (
                            <li className="book-item" key={id}><Link to={`/book/${id}`}>
                                <span>{name}</span></Link>
                            </li>
                        ))}
                    </ul>
                </div>}
                {isCreate && <div>
                    <NewBook isCreated={isCreated} onSelectStatusBook={this.handleSelectStatusBook} onSelectCurrencyBook={this.handleSelectCurrencyBook} onInputDescription={this.handleInputDescription} onSelectAuthor={this.handleSelectAuthor} onInputChange={this.handleInputChange}/>
                    {!isCreated &&<button onClick={this.handleSaveBook}>Create</button>}
                </div>}
            </div>
        );
    }
};

export default BookList;