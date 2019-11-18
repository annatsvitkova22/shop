import React, { FC } from 'react';
import { AuthenticationInputProps } from '../../../type/user.type';

import './login.css';

const LoginUser: FC<AuthenticationInputProps> = ({errorPassword, errorEmail, formValid, onValidateEmail, onValidatePassword, valuePassword, onInputValueUpdatePassword, valueEmail, onInputValueUpdateEmail, onCreateUser}) => (
    <form className="login-input-wrapper">
        <h2>Login</h2>
        <div className={`form-group ${onValidateEmail}`}>
            <input type='email'
                placeholder='Email'
                value={valueEmail}
                onChange={onInputValueUpdateEmail}
                name='email'
                />
            <br />
            <label>{errorEmail}</label>
        </div>
        <div className={`form-group ${onValidatePassword}`}>
            <input type='password'
                placeholder='Password'
                value={valuePassword}
                onChange={onInputValueUpdatePassword}
                name='password'
            />
            <label>{errorPassword}</label>
        </div>
        <button onClick={onCreateUser} disabled={formValid}>Login</button>
    </form>
);

export default LoginUser;