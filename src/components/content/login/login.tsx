import React, { FC } from 'react';
import { AuthenticationInputProps } from '../../../type/user.type';

import './login.css';

const LoginUser: FC<AuthenticationInputProps> = ({ isRegistration, errorPassword, errorEmail, formValid, onValidateEmail, onValidatePassword, valuePassword, onInputValueUpdatePassword, valueEmail, onInputValueUpdateEmail, onCreateUser }) => (
    <form className="login-input-wrapper">
        {!isRegistration && <div>
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
        </div>}
        {isRegistration && <div><h1>You have successfully logged in</h1></div>}
    </form>
);

export default LoginUser;