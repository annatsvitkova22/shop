import React, {FC} from 'react';

import AuthorItem from '../author-item/author-item';
import { AuthorListProps } from '../../../../type/author.type';

import '../author.css';


const AuthorList: FC<AuthorListProps> = ({ authors, onInputAuthor, onRemoveAuthor }) => (
    <ul className="author-list">
        {authors.map(({ id, name }) => (
            <AuthorItem id={id} name={name} onInputAuthor={onInputAuthor} onRemoveAuthor={() => onRemoveAuthor(id)} key={id} />
        ))}
    </ul>
);

export default AuthorList;