import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';

import '../author.css';
import { AuthorItemProps, UserRoleState } from '../../../../type/author.type';

class AuthorItem extends Component<AuthorItemProps, UserRoleState>  {
  state: UserRoleState = ({
    style: { display: '' },
  });

  roleAuthorInput = (): void => {
    const token = localStorage.getItem('accessToken');
    const jwt = require('jsonwebtoken');
    const payload = jwt.decode(token);

    if (payload.role === 'user') {
      this.setState({ style: { display: 'none' } });
    }
  }

  componentDidMount = () => {
    this.roleAuthorInput();
  }

  render() {
    const { id, name, onRemoveAuthor } = this.props;
    const { style } = this.state;
    return (
      <li className="author-item" key={id}><Link to={`/author/${id}`}>
        <span>{name}</span></Link>
        <button style={style} onClick={() => onRemoveAuthor(id)} className="fas fa-times" >delete</button>
      </li>
    )
  }
}

export default AuthorItem;
