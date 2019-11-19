import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import './header.css';
import { UserHeaderState } from '../../type/author.type';
import { thisExpression } from '@babel/types';


class Header extends Component<{}, UserHeaderState> {
  state: UserHeaderState = ({
    styleRoleAdmin: { display: '' },
    styleRoleUser: { display: '' },
    styleDefault: { display: '' }
  });

  roleAuthorInput = (): void => {
    const token = localStorage.getItem('accessToken');
    const jwt = require('jsonwebtoken');
    const payload = jwt.decode(token);

    // if (!token) {
    //   this.setState({styleRoleAdmin: { display: '' },
    //   styleRoleUser: { display: 'none' },
    //   styleDefault: { display: 'none' }});
    // }
    // const jwt = require('jsonwebtoken');
    // const payload = jwt.decode(token);
    // if (payload) {
    //   if (payload.role == 'admin') {
    //     this.setState({ styleRoleAdmin: { display: 'none' },
    //     styleRoleUser: { display: '' },
    //     styleDefault: { display: '' }});
    //   }
    //   if (payload.role == 'user') {
    //     this.setState({ styleRoleUser: { display: 'none' } });
    //     this.setState({ styleRoleAdmin: { display: 'none' } });
    //     this.setState({ styleDefault: { display: '' } });
    //   }
    // }
  }

  logOut = (): void => {
    localStorage.removeItem('accessToken');
    console.log(this.props);
    this.componentDidMount();
  }

  componentDidMount = () => {
    this.roleAuthorInput();
  }

  render() {
    const { styleDefault, styleRoleAdmin, styleRoleUser } = this.state;

    const token = localStorage.getItem('accessToken');

    const jwt = require('jsonwebtoken');
    const payload = jwt.decode(token);

    const isUser: boolean = payload.role === 'user';
    const isAdmin: boolean = payload.role === 'admin';
    const isToken: boolean = token !== null;
   
    return (
      <header className="header">
        <nav>
          <ul className="nav">
            <li ><NavLink exact to='/'>Books</NavLink></li>
            {!isAdmin && <li><NavLink to='/authors'>Authors</NavLink></li>}
            <li style={styleRoleUser}><NavLink to='/users'>Users</NavLink></li>
            <li style={styleDefault}><NavLink to='/cart'>Cart</NavLink></li>
            <li style={styleRoleAdmin}><NavLink to='/registration'>Registration</NavLink></li>
            <li style={styleRoleAdmin}><NavLink to='/login'>Login</NavLink></li>
            <li style={styleDefault} onClick={this.logOut}><NavLink to='/lolOut'>LogOut</NavLink></li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default Header;