import React from 'react';
import PropTypes from 'prop-types';

import '../author.css'

interface authorInput {
    value?: string,
    onClick: () => { },
    onChange: () => { },
}

const AuthorInput = ({ value, onChange, onClick }: authorInput) => (
    <div className="author-input-wrapper">
        <h2>Authors</h2>
        <input
            type='text'
            value={value}
            onChange={onChange}
        />
        <button onClick={onClick}>Add author</button>
    </div>
);

AuthorInput.propTypes = {
    onClick: PropTypes.func,
    onChange: PropTypes.func,
    value: PropTypes.string,
}

AuthorInput.defaultProps = {
    onClick: () => { },
    onChange: () => { },
    value: '',
}

export default AuthorInput;
