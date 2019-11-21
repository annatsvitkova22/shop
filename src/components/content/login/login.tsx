import React, { FC } from 'react';
import { AuthenticationInputProps } from '../../../type/user.type';

import './login.css';

const LoginUser: FC<AuthenticationInputProps> = ({ isValidateData, isRegistration, errorPassword, errorEmail, formValid, onValidateEmail, onValidatePassword, valuePassword, onInputValueUpdatePassword, valueEmail, onInputValueUpdateEmail, onCreateUser }) => (
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
            {isValidateData && <div className= "error-message"><h1>Incorrect email or password</h1></div>}
            <button onClick={onCreateUser} disabled={formValid}>Login</button>
        </div>}
        {isRegistration && <div><p>You have successfully logged in</p></div>}
    </form>
);

export default LoginUser;