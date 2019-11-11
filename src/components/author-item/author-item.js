import React from 'react';
import PropTypes from 'prop-types';

import '../author.css';

const AuthorItem = ({ name, removeAuthor, id }) => (
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
