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
        const { bookDescription, onValidateBookName, errorName, errorType, errorPrice, onValidateBookType, onValidateBookPrice, isCreate, bookCurrency, bookPrice, bookStatus, bookType, bookName, onCloseLoad, onInputImageChange, isLoadImage, loadImage, onSelectStatusBook, onInputChange, onSelectCurrencyBook, onSelectAuthor, onInputDescription, authorDefaultOptions } = this.props;

        return (
            <div className="edit-book">
                <div id='book-input-wrapper' className='book-input'>
                    <p>Book</p>
                    <div className={`form-group ${onValidateBookName}`}>
                        <input
                            type='text'
                            value={bookName}
                            onChange={onInputChange}
                            name="bookName"
                            required
                        />
                        <span className="bar"></span>
                        <label>{errorName}</label>
                    </div>
                    <div>
                        <input
                            type="file"
                            // value={nameFile}
                            accept="image/x-png,image/gif,image/jpeg"
                            onChange={onInputImageChange}
                        />
                        {isLoadImage && <div className="load">
                            <img src={loadImage} alt="image" className="load-image" />
                            <span className="close" onClick={onCloseLoad}></span>
                        </div>}

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
                    <div className={`form-group ${onValidateBookType}`}>
                        <input
                            type='text'
                            value={bookType}
                            onChange={onInputChange}
                            name="bookType"
                            required
                        />
                        <span className="bar"></span>
                        <label>{errorType}</label>
                    </div>
                    <br />
                    <div>
                        <div className={`form-group ${onValidateBookPrice}`}>
                            <label>Price:</label>
                            <input
                                type='number'
                                value={bookPrice}
                                onChange={onInputChange}
                                name="bookPrice"
                                min="0"
                                step="1"
                            />
                            <label>{errorPrice}</label>
                        </div>
                        <div>
                            <label>Currency:</label>
                            {!isCreate ? <Select
                                placeholder="Currency"
                                options={currencyBookOptions}
                                defaultValue={[{ value: bookCurrency, label: bookCurrency }]}
                                onChange={onSelectCurrencyBook}
                            /> : <Select
                                    placeholder="Currency"
                                    options={currencyBookOptions}
                                    defaultValue={[currencyBookOptions[0]]}
                                    onChange={onSelectCurrencyBook} />}
                        </div>
                    </div>
                    <div>
                        <label>Status:</label>
                        {!isCreate ? <Select
                            placeholder="Status"
                            options={typeBookOptions}
                            defaultValue={[{ value: bookStatus, label: bookStatus }]}
                            onChange={onSelectStatusBook}
                        /> : <Select
                                placeholder="Status"
                                options={typeBookOptions}
                                defaultValue={[typeBookOptions[0]]}
                                onChange={onSelectStatusBook}
                            />}
                        <br />
                    </div>
                </div>
            </div>
        );
    }
};
export default NewBook;
