import React from 'react';
import PropTypes from 'prop-types';

import '../author.css';

interface authorItem {
  name?: string,
  removeAuthor?: any,
  id?: string
}

const AuthorItem = ({ name, removeAuthor, id }: authorItem) => (
  <li className="author-item">
    <span>{name}</span>
    <button onClick={() => removeAuthor(id)}  className="fas fa-times" >delete</button>
  </li>
);

AuthorItem.propTypes = {
isRemoved: PropTypes.bool,
  removeTask: PropTypes.func,
  id: PropTypes.string,
}

AuthorItem.defaultProps = {
  name: '',
  removeTask: () => {},
  id: '',
}

export default AuthorItem;
