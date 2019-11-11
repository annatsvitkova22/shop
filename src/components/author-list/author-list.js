import React from 'react';
import PropTypes from 'prop-types';

import AuthorItem from '../author-item/author-item';

import '../author.css';

const AuthorList = ({ testsList, removeAuthor }) => (
    <ul className="author-list">
        {Array.isArray(testsList) && testsList.map(({ id, name }) => (
            <AuthorItem removeAuthor={removeAuthor} id={id} key={id} name={name} />
        ))}
    </ul>
);

AuthorList.propTypes = {
    testsList: PropTypes.array,
    removeTask: PropTypes.func,
}

AuthorList.defaultProps = {
    testsList: [],
    removeTask: () => { },
}

export default AuthorList;
