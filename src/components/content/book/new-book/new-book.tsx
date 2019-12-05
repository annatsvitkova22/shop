import React, { Component } from 'react';
import Select, { } from "react-select";
import { BookProps, SelectModel, NewBookState } from '../../../../type/book.type';
import { RequestOptionsModel, AuthorModel } from '../../../../type/author.type';

import './new-book.css';

const BASE_AUTHOR = 'https://192.168.0.104:443/author/';

class NewBook extends Component<BookProps, NewBookState> {
    state: NewBookState = ({
        authorOptions: [],
        typeBookOptions: [
            { value: 'yes', label: 'yes' },
            { value: 'no', label: 'no' }],
        currencyBookOptions: [
            { value: 'USD', label: 'USD' },
            { value: 'EUR', label: 'EUR' },
            { value: 'UAH', label: 'UAH' }],
    });

    componentDidMount = (): void => {
        this.requestGetAllAuthors();
    }

    requestGetAllAuthors = (): void => {
        const token: string | null = localStorage.getItem('accessToken');
        const headers: Headers = new Headers();
        headers.append('Authorization', 'Bearer ' + token);
        const options: RequestOptionsModel = {
            method: 'GET',
            headers,
        };

        const url = BASE_AUTHOR + 'isRemoved';
        const request: Request = new Request(url, options);
        fetch(request)
            .then((res: Response) => res.json())
            .then((authors: AuthorModel[]) => {
                const mas: NewBookState = {} as NewBookState;
                mas.authorOptions = [];

                for (let i = 0; i < authors.length; i++) {
                    const sel: SelectModel = {} as SelectModel;
                    sel.value = authors[i].id;
                    sel.label = authors[i].name;

                    mas.authorOptions.push(sel);
                }
                this.setState({ authorOptions: mas.authorOptions })
            })
            .catch(error => error);
    }


    render() {
        const { authorOptions, typeBookOptions, currencyBookOptions } = this.state;
        const { bookName, isCreated, bookImage, onInputImageChange, labelChangeName, onSelectStatusBook, onInputChange, onSelectCurrencyBook, onSelectAuthor, onInputDescription, authorDefaultOptions, bookStatus, bookCurrency, bookType, bookPrice, bookDescription } = this.props;

        return (
            <div className="edit-book">
                {!isCreated && <div id='book-input-wrapper' className='book-input'>
                    <p>Book</p>
                    <div className="group">
                        <input
                            type='text'
                            value={bookName}
                            onChange={onInputChange}
                            name="bookName"
                            required
                        />
                        <span className="bar"></span>
                        <label>Name</label>
                    </div>
                    <div>
                        <input
                            type="file"
                            value={bookImage}
                            onChange={onInputImageChange}
                        />
                    </div>
                    <br />
                    <div>
                        <Select
                            placeholder="Authors"
                            closeMenuOnSelect={false}
                            defaultValue={authorDefaultOptions}
                            isMulti
                            options={authorOptions}
                            onChange={onSelectAuthor}
                            name="authors"
                        />
                    </div>
                    <div>
                        <textarea name="Description"
                            value={bookDescription}
                            onChange={onInputDescription} />
                    </div>
                    <br />
                    <div className="group">
                        <input
                            type='text'
                            value={bookType}
                            onChange={onInputChange}
                            name="bookType"
                            required
                        />
                        <span className="bar"></span>
                        <label>Type</label>
                    </div>
                    <br />
                    <div>
                        <div>
                            <label>Price:</label>
                            <input
                                type='number'
                                value={bookPrice}
                                onChange={onInputChange}
                                name="bookPrice"
                                min="0"
                                step="1"
                            />
                        </div>
                        <div>
                            <label>Currency:</label>
                            <Select
                                placeholder="Currency"
                                options={currencyBookOptions}
                                defaultValue={[{ value: bookCurrency, label: bookCurrency }]}
                                onChange={onSelectCurrencyBook}
                            />
                        </div>
                    </div>
                    <div>
                        <label>Status:</label>
                        <Select
                            placeholder="Status"
                            options={typeBookOptions}
                            defaultValue={[{ value: bookStatus, label: bookStatus }]}
                            onChange={onSelectStatusBook}
                        />
                        {labelChangeName && <label>Book updated</label>}
                        <br />
                    </div>
                </div>}
                {isCreated && <div>
                    <label>Book saved</label>
                </div>}
            </div>
        );
    }
};
export default NewBook;
