import React, { Component } from 'react';

import '../author.css';
import { AuthorInputProps, UserRoleState } from '../../../../type/author.type';

class AuthorInput extends Component<AuthorInputProps, UserRoleState>  {
    state: UserRoleState = ({
        style: { display: '' },
    });

    roleAuthorInput = (): void => {
        const token = localStorage.getItem('accessToken');
        const jwt = require('jsonwebtoken');
        const payload = jwt.decode(token);

        if (payload.role == 'admin') {
            this.setState({ style: { display: 'none' } });
        }
    }

    componentDidMount = () => {
        this.roleAuthorInput();
    }

    render() {
        const { value, onInputValueUpdate, onCreateAuthor} = this.props;
        const { style } = this.state
        return (
            <div className="author-input-wrapper">
                <h2>Authors</h2>
                <div id='author-input-wrapper' style={style} className='author-input'>
                    <input
                        type='text'
                        value={value}
                        onChange={onInputValueUpdate}
                    />
                    <button onClick={onCreateAuthor}>Add author</button>
                </div>
            </div>
        );
    }

}

export default AuthorInput;
