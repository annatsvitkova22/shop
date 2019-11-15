import React, { FC } from 'react';
import { UserInputProps } from '../../../type/user.type';

import './create-user.css';


const RegistrationUser: FC<UserInputProps> = ({valueFirstName, onInputValueUpdateFirstName, valueLastName, onInputValueUpdateLastName, valuePassword, onInputValueUpdatePassword, valueEmail, onInputValueUpdateEmail, onCreateUser}) => (
    <div className="author-input-wrapper">
        <h2>Registration</h2>

        <input
            type='text'
            value={valueFirstName}
            onChange={onInputValueUpdateFirstName}
        />
        <br />
        <input type='text'
            value={valueLastName}
            onChange={onInputValueUpdateLastName}
        />
        <br />
        <input type='password'
            value={valuePassword}
            onChange={onInputValueUpdatePassword}
        />
        <br />
        <input type='email'
            value={valueEmail}
            onChange={onInputValueUpdateEmail} />
        <br />
        <button onClick={onCreateUser}>Create your account</button>

    </div>
);

export default RegistrationUser;