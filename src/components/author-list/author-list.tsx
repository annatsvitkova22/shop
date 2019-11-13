import React, {FC} from 'react';
import PropTypes from 'prop-types';

import AuthorItem from '../author-item/author-item';

import '../author.css';
import { AuthorListProps } from '../../type/author.type';


const AuthorList: FC<AuthorListProps> = ({ authors, onRemoveAuthor }) => (
    <ul className="author-list">
        {authors.map(({ id, name }) => (
            <AuthorItem id={id} name={name} onRemoveAuthor={() => onRemoveAuthor(id)} key={id} />
        ))}
    </ul>
);

export default AuthorList;