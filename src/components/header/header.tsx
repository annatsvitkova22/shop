import React, {FC} from 'react';
import { NavLink } from 'react-router-dom';

import './header.css';


const Header: FC = () => (
    <header className="header">
       <nav>
        <ul className="nav">
          <li><NavLink to='/books'>Books</NavLink></li>
          <li><NavLink to='/authors'>Authors</NavLink></li>
          <li><NavLink exact to='/'>Sign</NavLink></li>
        </ul>
      </nav>
    </header>
);

export default Header;