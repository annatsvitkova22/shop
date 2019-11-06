import React, { Component } from 'react';
import './author.css';
import { connect } from 'react-redux';

class Author extends Component {
    state = {
        authors: [],
        tests: [],
    };

    componentDidMount = () => {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const options = {
            method: 'GET',
            headers,
        };
        const request = new Request('https://localhost:443/author/', options);
        fetch(request)
            .then(res => res.json())
            .then(authors => this.setState({ authors }));
        console.log(this.props);
        console.log(this.state);
    }

    addAuthor() {
        const createAuthor = {
            name: this.authorInput.value,
        };
        console.log(createAuthor)
        this.createAuthor(createAuthor);
        this.props.onAddAuthor(this.authorInput.value);
        this.authorInput.value = '';
    }

    createAuthor(data) {
        const json = JSON.stringify(data);
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const options = {
            method: 'POST',
            headers,
            body: json,
        };
        const request = new Request('https://localhost:443/author/', options);
        fetch(request)
            .then(res => res.json())
            .then(tests => this.setState({ tests }));
    }

    render() {
        return (
            <div>
                <h2>Authors</h2>
                <input type="text" ref={(input) => { this.authorInput = input }} />
                <button onClick={this.addAuthor.bind(this)}>Add author</button>
                <ul>
                    {this.state.authors.map(author =>
                        <li key={author.id}>{author.name}</li>
                    )}
                </ul>
                <hr />
                {/* <ul>
                    {this.state.test.map(test =>
                        <li key={test.id}>{test.name}</li>
                    )}
                </ul> */}
            </div>
        );
    }
}

export default connect(state => ({
    tests: state
}),
    dispatch => ({
        onAddAuthor: (authorName) => {
            dispatch({ type: 'ADD_AUTHOR', payload: authorName })
        }
    })
)(Author);
