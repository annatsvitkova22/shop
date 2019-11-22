import React, { FC } from 'react';
import { AuthenticationInputProps } from '../../../type/user.type';

import './login.css';

const LoginUser: FC<AuthenticationInputProps> = ({isSendMail, isForgotPassword, isValidateData, onSendLetter, onPasswordRecovery, isRegistration, errorPassword, errorEmail, formValid, onValidateEmail, onValidatePassword, valuePassword, onInputValueUpdatePassword, valueEmail, onInputValueUpdateEmail, onCreateUser }) => (
    <form className="login-input-wrapper">
        {!isRegistration && <div>
            {isSendMail && <div className="send-mail"><p>Letter sent successfully check mail</p></div>}
            {isForgotPassword ? <h2>Login</h2>: <h2>Forgot Password</h2>}
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
            {isForgotPassword && <div className={`form-group ${onValidatePassword}`}>
                <input type='password'
                    placeholder='Password'
                    value={valuePassword}
                    onChange={onInputValueUpdatePassword}
                    name='password'
                />
                <label>{errorPassword}</label>
            </div>}
            {isValidateData && <div className= "error-message"><h1>Incorrect email or password or you didn't confirm mail</h1></div>}
            {isForgotPassword && <div className="forgot-password" ><p onClick={onPasswordRecovery}>Forgot password</p></div>}
            {isForgotPassword ? <button onClick={onCreateUser} disabled={formValid}>Login</button> : <button onClick={onSendLetter} disabled={formValid}> Send </button>}
        </div>}
        {isRegistration && <div className="login-message"><p>You have successfully logged in</p></div>}
    </form>
);

export default LoginUser;