import React, { Component } from 'react';
import { Slider } from 'antd';

import './filter.css';
import 'antd/dist/antd.css';
import { RequestOptionsModel } from '../../../type/author.type';

const BASE_PATH = 'https://192.168.0.104:443/printingEdition/';

class Filter extends Component<any, any> {
    state = ({
        maxPrice: 0,
    });

    onChange(value: any) {
        console.log('onChange: ', value);
    }

    onAfterChange(value: any) {
        console.log('onAfterChange: ', value);
    }

    componentDidMount = () => {
        this.getMaxPrice();
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

        return (
            <div className="hover-table-layout">
                <div>
                    <div className="filter-name">
                        <label>Name book</label>
                        <input
                            type='text'
                            name="bookName"
                            required
                        />
                        <span className="bar"></span>
                    </div>
                    <div className="filter-status">
                        <label>In stock</label>
                        <input type="checkbox"
                            className="option-input"
                        />
                    </div>
                    <div className="filter-price">
                        <label>Price</label>
                        <Slider
                            range
                            step={1}
                            defaultValue={[0, maxPrice]}
                            onChange={this.onChange}
                            onAfterChange={this.onAfterChange}
                            max={maxPrice}
                        />
                    </div>
                    <div>
                        <button className="button-create">
                            Filter
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Filter;