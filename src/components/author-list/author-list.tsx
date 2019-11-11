import React from 'react';
import PropTypes from 'prop-types';

import AuthorItem from '../author-item/author-item';

import '../author.css';

interface authorList {
    testsList: [],
    removeAuthor: () => { },
  }

const AuthorList = ({ testsList, removeAuthor }: authorList) => (
    <ul className="author-list">
        {Array.isArray(testsList) && testsList.map(({ id, name }) => (
            <AuthorItem removeAuthor={removeAuthor} id={id} key={id} name={name} />
        ))}
    </ul>
);

AuthorList.propTypes = {
    testsList: PropTypes.array,
    removeAuthor: PropTypes.func,
}

AuthorList.defaultProps = {
    testsList: [],
    removeAuthor: () => { },
}

export default AuthorList;
