import React, {FC} from 'react';

import '../author.css';
import { AuthorItemProps } from '../../../../type/author.type';

const AuthorItem: FC<AuthorItemProps> = ({ id, name, onInputAuthor, onRemoveAuthor}) => (
  <li className="author-item">
    <span>{name}</span>
    <button style={onInputAuthor} onClick={() => onRemoveAuthor(id)} className="fas fa-times" >delete</button>
  </li>
);

export default AuthorItem;