import React, { Component, ChangeEvent } from 'react';
import { Slider } from 'antd';

import './filter.css';
import 'antd/dist/antd.css';
import { RequestOptionsModel } from '../../../type/author.type';
import { BookModel, FilterState, FilterProps } from '../../../type/book.type';
import { SliderValue } from 'antd/lib/slider';

const BASE_PATH = 'https://192.168.0.104:443/printingEdition/';

class Filter extends Component<FilterProps, FilterState> {
    state: FilterState = ({
        maxPrice: 0,
        check: false,
        nameBook: '',
        priceMin: '',
        priceMax: '',
    });

    handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const { value } = event.target;
        this.setState({ nameBook: value });
    }

    handleInputCheck = (event: ChangeEvent<HTMLInputElement>): void => {
        const check = event.target.checked;
        this.setState({ check });
    }

    onAfterSliderChange = (value: SliderValue) => {
        const price: SliderValue[] = value as Array<SliderValue>;
        let priceMin: string = '';
        if (price.length) {
            console.log('fdgfdg');
            const priceMin: string = 'priceMin=' + price[0];
            const priceMax: string = 'priceMax=' + price[1];
            console.log(priceMin, priceMax);
            this.setState({ priceMin, priceMax });
            console.log(this.state)
        }
    }

    componentDidMount = () => {
        this.getMaxPrice();
    }

    onCreateFilter = (): void => {
        const { check, nameBook, priceMin, priceMax } = this.state;
        let dataFilter: string = '';
        if (nameBook) {
            dataFilter += 'name=' + nameBook;
        }
        if (check) {
            if (dataFilter) {
                dataFilter += '&';
            }
            dataFilter += 'status=yes';
        }
        if (priceMin) {
            if (dataFilter) {
                dataFilter += '&';
            }
            dataFilter += priceMin;
        }
        if (priceMax) {
            if (dataFilter) {
                dataFilter += '&';
            }
            dataFilter += priceMax;
        }
        console.log('dataFilter', dataFilter);
        this.props.handleFilter(dataFilter);
    }

    getMaxPrice = (): void => {
        const headers: Headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const options: RequestOptionsModel = {
            method: 'GET',
            headers,
        };

        const url = BASE_PATH + 'maxPrice';
        const request: Request = new Request(url, options);
        fetch(request)
            .then((res: Response) => res.json())
            .then((maxPrice: number) => this.setState({ maxPrice }))
            .catch(error => error);
    }

    render() {
        const { maxPrice } = this.state;
        console.log(this.state);
        console.log(this.props);
        return (
            <div className="hover-table-layout">
                <div>
                    <div className="filter-name">
                        <label>Name book</label>
                        <input
                            type='text'
                            name="bookName"
                            onChange={this.handleInputChange}
                            required
                        />
                        <span className="bar"></span>
                    </div>
                    <div className="filter-status">
                        <label>In stock</label>
                        <input type="checkbox"
                            className="option-input"
                            onChange={this.handleInputCheck}
                        />
                    </div>
                    <div className="filter-price">
                        <label>Price</label>
                        <Slider
                            range
                            step={1}
                            defaultValue={[0, maxPrice]}
                            onAfterChange={this.onAfterSliderChange}
                            max={maxPrice}
                        />
                    </div>
                    <div>
                        <button className="button-create" onClick={() => this.onCreateFilter()}>
                            Filter
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Filter;