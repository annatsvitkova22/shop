import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import './book-cart.css';

const BookCart: FC<any> = ({ image, id, name, price, currency, type, onAddToCart, isRoleUser }) => (
    <div className="listing-item">
        <figure className="image">
            <img src={image} alt="image" />
            <figcaption>
                <div className="caption">
                    <p><span>{name}</span></p>
                </div>
            </figcaption>
        </figure>
        <Link to={`/book/${id}`}>
            <div className="listing">
                <p>{name}</p>
                <p>{price} {currency}</p>
                <p>{type}</p>
            </div></Link>
        <div className="add-cart">
            {isRoleUser && <a className="button-create" onClick={() => onAddToCart(id)}>
                <span className="button__line button__line--top"></span>
                <span className="button__line button__line--right"></span>
                <span className="button__line button__line--bottom"></span>
                <span className="button__line button__line--left"></span>
                Add to cart
            </a>}
        </div>

    </div>
);


export default BookCart;
