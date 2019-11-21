import React, { FC } from 'react';
import { UserInputProps } from '../../../type/user.type';

import './create-user.css';

const RegistrationUser: FC<UserInputProps> = ({ isUser, errorPassword, isRegistration, errorEmail, formValid, onValidateEmail, onValidatePassword, valueFirstName, onInputValueUpdateFirstName, valueLastName, onInputValueUpdateLastName, valuePassword, onInputValueUpdatePassword, valueEmail, onInputValueUpdateEmail, onCreateUser }) => (
    <form className="user-input-wrapper">
        {!isRegistration && <div>
            <h2>Registration</h2>
            <input
                type='text'
                placeholder='First Name'
                value={valueFirstName}
                onChange={onInputValueUpdateFirstName}
                name='firstName'
            />
            <br />
            <input type='text'
                placeholder='Last Name'
                value={valueLastName}
                onChange={onInputValueUpdateLastName}
                name='lastName'
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
            {isUser && <div className = "error-message">The data is incorrect or the user with this email is already registered</div>}
            <button onClick={onCreateUser} disabled={formValid}>Create your account</button>
        </div>}
        {isRegistration && <div className = "successfully-message"><p>You are successfully registered, confirm your email!</p></div>}
    </form>
);

export default RegistrationUser;