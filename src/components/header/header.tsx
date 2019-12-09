import React, { FunctionComponent } from 'react';
import { NavLink } from 'react-router-dom';

import './header.css';
import { HeaderProps } from '../../type/user.type';

const Header: FunctionComponent<HeaderProps> = (props: HeaderProps) => {
  const { isAdmin, isUser, isToken, onLogOut }: HeaderProps = props;
  return (
    <header className="header">
      <nav>
        <ul className="nav">
          <li><NavLink exact to='/'>Books</NavLink></li>
          {isAdmin && !isUser && <li><NavLink to='/authors'>Authors</NavLink></li>}
          {isAdmin && <li><NavLink to='/users'>Users</NavLink></li>}
          {isUser && <li><NavLink to='/cart'>Cart</NavLink></li>}
          {!isToken && <li><NavLink to='/registration'>Registration</NavLink></li>}
          {!isToken && <li><NavLink to='/login'>Login</NavLink></li>}
          {isToken && <li onClick={onLogOut}><NavLink to='/lolOut'>LogOut</NavLink></li>}
        </ul>
      </nav>
    </header>
  );
};

export default Header;