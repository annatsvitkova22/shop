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
            type: '',
            image: '',
        },
        authorDefaultOptions: [],
        multiValue: [],
        authors: [],
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

    handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const { value, name } = event.target;
        const { book } = this.state;
        let updateBook = book;
        switch (name) {
            case 'bookName':
                updateBook.name = value;
                this.setState({ book: updateBook });
                break;
            case 'bookType':
                updateBook.type = value;
                this.setState({ book: updateBook });
                break;
            case 'bookPrice':
                updateBook.price = +value;
                this.setState({ book: updateBook });
                break;
            default:
                break;
        }
    }

    handleEdit = (): void => {
        this.setState({ isEdit: true });
    }

    handleEditBook = async (): Promise<void> => {
        const { book, authors }: BookPostState = this.state;

        const editBook: BookWithAuthorsModel = {
            printingEdition: {
                id: book.id,
                name: book.name,
                description: book.description,
                price: book.price,
                status: book.status,
                currency: book.currency,
                type: book.type,
            },
            authors
        }

        const updatedBook = await this.requestEditBook(editBook);
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
        const { book } = this.state;
        book.status = value;
        this.setState({ book });
    }

    handleSelectCurrencyBook = (event: any): void => {
        const value: any = event.value;
        const { book } = this.state;
        book.currency = value;
        this.setState({ book });
    }

    handleInputDescription = (event: ChangeEvent<HTMLTextAreaElement>): void => {
        const { value } = event.target;
        const { book } = this.state;
        book.description = value;
        this.setState({ book });
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
                this.setState({ book: bookWithAuthor.printingEdition, authors: bookWithAuthor.authors })
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

        const options: RequestOptionsModel = {
            method: 'PUT',
            headers,
            body: json,
        };

        let book: BookModel = {} as BookModel;
        const request: Request = new Request(BASE_PATH, options);
        await fetch(request)
            .then((res: Response) => res.json())
            .then((cratedBook: BookModel) => {
                book = cratedBook
                console.log('book', cratedBook)
            })
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
            .then((book: BookModel) => this.setState({ book }))
            .catch(error => error);
    }

    render() {
        const { book, labelChangeName, authorDefaultOptions, isRoleUser, authors, isEdit } = this.state;
        console.log(this.state);
        return (
            <div className="book-post">
                {isRoleUser && isEdit && <NewBook isLoadImage={true} onSelectStatusBook={this.handleSelectStatusBook} onSelectAuthor={this.handleSelectAuthor} loadImage={book.image} bookName={book.name} bookCurrency={book.currency} bookDescription={book.description} bookPrice={book.price} bookStatus={book.status} bookType={book.type} labelChangeName={labelChangeName} onSelectCurrencyBook={this.handleSelectCurrencyBook} onInputDescription={this.handleInputDescription} authorDefaultOptions={authorDefaultOptions} onInputChange={this.handleInputChange} />}
                {!isEdit && !book.isRemoved && <div>
                    <div>
                        <p><span>Name: </span> {book.name}</p>
                        {isRoleUser ? <p><span>Authors: </span> {authors.map(({ name, id }) => (
                            <Link to={`/author/${id}`}><span>{name} </span></Link>))}</p> : <p><span>Authors: </span> {authors.map(({ name, id }) => (
                                <span key={id}>{name} </span>))}</p>}
                        <p><img src={book.image} alt="image" /></p>
                        <p><span>Description: </span>{book.description}</p>
                        <p><span>Type: </span> {book.type}</p>
                        <p><span>Status: </span>{book.status}</p>
                        <p><span>Price: </span> {book.price}</p>
                        <p><span>Currency: </span>{book.currency}</p>
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