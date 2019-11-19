import React, { FC } from 'react';

import '../author.css';
import { AuthorInputProps } from '../../../../type/author.type';

const AuthorInput: FC<AuthorInputProps> = ({ value, onInputAuthor, onInputValueUpdate, onCreateAuthor }) => (
    <div className="author-input-wrapper">
        <h2>Authors</h2>
        <div id='author-input-wrapper' style={onInputAuthor} className='author-input'>
            <input
                type='text'
                value={value}
                onChange={onInputValueUpdate}
            />
            <button onClick={onCreateAuthor}>Add author</button>
        </div>
    </div>
);

export default AuthorInput;
