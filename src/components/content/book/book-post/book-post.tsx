import React, { Component } from 'react';
import Select from "react-select";


import { RequestOptionsModel, AuthorModel, AuthorListState } from '../../../../type/author.type';
import { BookPostState, BookModel, EditBookModel, BookWithAuthorsModel, SelectModel } from '../../../../type/book.type';
import { Link } from 'react-router-dom';

const BASE_PATH = 'https://192.168.0.104:443/printingEdition/';
const BASE_AUTHOR = 'https://192.168.0.104:443/author/';

class BookPost extends Component<any, BookPostState> {
    // constructor(props: any) {
    //     super(props);
    //     this.handleMultiChange = this.handleMultiChange.bind(this);
    // }
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
        filterOptions: [],
        multiValue: [],
        authors: [],
        bookName: '',
        labelChangeName: '',
        isRoleUser: false,
        isEdit: false,
    });

    componentDidMount = (): void => {
        const { id } = this.props.match.params;
        this.requestGetBook(id);
        this.roleUser();
        this.requestGetAllAuthors();
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

    handleEdit = () => {
        this.setState({ isEdit: true });
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
        this.setState({ labelChangeName: 'Book changed' });
    }

    handleRemovaBook = (): void => {
        const { id } = this.props.match.params;
        this.requestRemoveBook(id);

    }

    // handleMultiChange(option: any) {
    //     this.setState(state => {
    //       this.handleMultiChange = this.handleMultiChange.bind(this);
    //       return {
    //         multiValue: option
    //       };
    //     });
    //   }

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
            .then((bookWithAuthor: BookWithAuthorsModel) => this.setState({ book: bookWithAuthor.printingEdition, bookName: bookWithAuthor.printingEdition.name, authors: bookWithAuthor.authors }))
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

    requestGetAllAuthors = (): void => {
        const token: string | null = localStorage.getItem('accessToken');
        const headers: Headers = new Headers();
        headers.append('Authorization', 'Bearer ' + token);
        const options: RequestOptionsModel = {
            method: 'GET',
            headers,
        };

        const request: Request = new Request(BASE_AUTHOR, options);
        fetch(request)
            .then((res: Response) => res.json())
            .then((authors: AuthorModel[]) => {
                const mas: BookPostState = {} as BookPostState;
                mas.filterOptions = [];
            for (let i = 0; i < authors.length; i++) {
                const sel : SelectModel = {} as SelectModel;
                 sel.value = authors[i].name;
                 sel.label = authors[i].name;

                 mas.filterOptions.push(sel);
            }
            this.setState({filterOptions: mas.filterOptions})})
            .catch(error => error);
    }

    render() {
        const { bookName, book, labelChangeName, isRoleUser, authors, isEdit, filterOptions } = this.state;
        console.log(this.state);
        return (
            <div className="book-post">
                {isRoleUser && isEdit && <div className="edit-book">
                    <h2>Book</h2>
                    <div id='book-input-wrapper' className='book-input'>
                        <input
                            type='text'
                            value={bookName}
                            onChange={this.handleInputChange}
                        />
                        <br />
                        <Select
                            placeholder="Authors"
                            closeMenuOnSelect={false}
                            defaultValue={[filterOptions[1]]}
                            isMulti
                            options={filterOptions}
                        />
                        <label>{labelChangeName}</label>
                        <br />
                    </div>
                    {book.isRemoved && <label>Book {book.name} deleted</label>}
                </div>}

                {!isEdit && <div>
                    <div>
                        <p><span>Name: </span> {bookName}</p>
                        <p><span>Authors: </span> {authors.map(({ name, id }) => (
                            <Link to={`/author/${id}`}><span>{name} </span></Link>))}</p>
                        <p><span>Description: </span>{book.description}</p>
                        <p><span>Type: </span> {book.type}</p>
                        <p><span>Status: </span>{book.status}</p>
                        <p><span>Price: </span> {book.price}</p>
                        <p><span>Currency: </span>{book.currency}</p>
                    </div>
                </div>}
                {isRoleUser && !isEdit && <div className="button">
                    <button onClick={this.handleEdit} >Edit</button>
                    <button onClick={this.handleRemovaBook} >Remove</button>
                </div>}
                {isEdit && <button onClick={this.handleEditBook} >Edit</button>}
            </div>
        );
    }
};

export default BookPost;