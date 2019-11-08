import React, { Component } from 'react';
import { connect } from 'react-redux';
import './author.css';

const BASE_PATH = 'https://localhost:443/author/';

class Author extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            tests: [],
        });
    }

    addAuthor = () => {
        const { value } = this.authorInput;
        const createAuthor = {
            name: value,
        };
        this.createAuthor(createAuthor);
        this.props.onAddAuthor(value);
        this.authorInput.value = '';
        console.log(this.state);
        console.log(this.props.testAuthor);
    }

    componentDidMount = () => {
        this.getAllAuthors();
    }

    componentDidUpdate(prevProps) {
        console.log(this.props.testAuthor);
        if (this.props.testAuthor !== prevProps.testAuthor) {
            this.getAllAuthors();
        }
      }

    getAllAuthors = () => {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const options = {
            method: 'GET',
            headers,
        };
        const request = new Request(BASE_PATH, options);
        fetch(request)
            .then(res => res.json())
            .then(tests => this.setState({ tests }))
            .catch(error => error);
    }

    createAuthor = (data) => {
        const json = JSON.stringify(data);
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const options = {
            method: 'POST',
            headers,
            body: json,
        };
        const request = new Request(BASE_PATH, options);
        fetch(request)
            .catch(error => error);
    }

    render() {
        const { testAuthor } = this.props;
        const { tests } = this.state;
        return (
            <div>
                <h2>Authors</h2>
                <input type="text" ref={(input) => { this.authorInput = input }} />
                <button onClick={this.addAuthor}>Add author</button>
                <ul>
                    {
                        tests.map(({id, name}) => <li key={id}>{name}</li>)
                    }
                </ul>
                {/* <ul>
                    {
                        testAuthor.map((author, index) => <li key={index}>{author}</li>)
                    }
                </ul> */}
            </div>
        );
    }
}

export default connect( state => ({
        testAuthor: state,
    }),
    dispatch => ({
        onAddAuthor: (authorName) => {
            dispatch({ type: 'ADD_AUTHOR', payload: authorName });
        }
    })
)(Author);
