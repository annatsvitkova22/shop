import React, { FC } from 'react';



const CreateUser: FC = () => (
    <div className="author-input-wrapper">
        <h2>Registration</h2>

        <input type='text'/>
        <br/>
        <input type='text'/>
        <br/>
        <input type='password'/>
        <br/>
        <input type='email'/>
        <br/>
        <button >Create your account</button>

    </div>
);

export default CreateUser;