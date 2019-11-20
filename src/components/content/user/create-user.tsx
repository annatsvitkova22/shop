import React, { FC } from 'react';
import { UserInputProps } from '../../../type/user.type';

import './create-user.css';

const RegistrationUser: FC<UserInputProps> = ({ errorPassword, isRegistration, errorEmail, formValid, onValidateEmail, onValidatePassword, valueFirstName, onInputValueUpdateFirstName, valueLastName, onInputValueUpdateLastName, valuePassword, onInputValueUpdatePassword, valueEmail, onInputValueUpdateEmail, onCreateUser }) => (
    <form className="user-input-wrapper">
        {!isRegistration && <div>
            <h2>Registration</h2>
            <input
                type='text'
                placeholder='First Name'
                value={valueFirstName}
                onChange={onInputValueUpdateFirstName}
            />
            <br />
            <input type='text'
                placeholder='Last Name'
                value={valueLastName}
                onChange={onInputValueUpdateLastName}
            />
            <br />
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
            <button onClick={onCreateUser} disabled={formValid}>Create your account</button>
        </div>}
        {isRegistration && <div><h1>You are successfully registered, confirm your email</h1></div>}
    </form>
);

export default RegistrationUser;