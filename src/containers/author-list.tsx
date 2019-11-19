import React, { Component, ReactElement } from 'react';
import { connect } from 'react-redux';

import { addAuthor, removeAuthor } from '../actions/actions';
import AuthorInput from '../components/content/author/author-input/author-input';
import AuthorList from '../components/content/author/author-list/author-list';

import '../components/author.css';
import { AuthorListState, AuthorProps, } from '../type/author.type';
import JwtDecode from 'jwt-decode';

const BASE_PATH = 'https://192.168.0.104:443/author/';


class Author extends Component<AuthorProps, AuthorListState> {
    state: AuthorListState = ({
        authors: [],
        authorName: '',
        styleInput: { display: '' },
        styleDelete: { display: '' }
    });

    deleteAuthor = (): void => {
        const token = localStorage.getItem('accessToken');
        const jwt = require('jsonwebtoken');
        const payload = jwt.decode(token);

        if (payload.role == 'admin') {
            const inputElement: any = document.getElementById('author-input-wrapper');
            debugger;
            inputElement.style.display = "none";
            // element[0].style.display = 'none';
            // this.setState({ styleInput: { display: 'none' } });
        }
    }

    handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const { value } = event.target;

        this.setState({
            authorName: value,
        });
    }

    addAuthor = () => {
        const { authorName }: AuthorListState = this.state;
        const createAuthor = {
            name: authorName,
        };
        this.createAuthor(createAuthor);

        this.setState({
            authorName: '',
        });
    }

    componentDidMount = () => {
        this.getAllAuthors();
    }

    componentDidUpdate(prevProps: any) {
        const { author }: any = this.props;

        if (author !== prevProps.author) {
            this.getAllAuthors();
        }
    }

    getAllAuthors = (): void => {
        this.deleteAuthor();
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const options = {
            method: 'GET',
            headers,
        };
        const request = new Request(BASE_PATH, options);
        fetch(request)
            .then(res => res.json())
            .then(authors => this.setState({ authors }))
            .catch(error => error);
    }

    createAuthor = (data: any): void => {
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
            .then(res => res.json())
            .then(createdAuthor => this.props.addAuthor(createdAuthor))
            .catch(error => error);
    }

    removeAuthor = (id: string): void => {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const options = {
            method: 'DELETE',
            headers,
        };

        const path = BASE_PATH + id;
        console.log(path);

        const request = new Request(path, options);
        fetch(request)
            .then(res => res.json())
            .then(createdAuthor => this.props.removeAuthor(createdAuthor))
            .catch(error => error);
    }

    render(): ReactElement {
        const { authorName, authors, styleInput }: AuthorListState = this.state;

        return (
            <div className="content">
                <AuthorInput onCreateAuthor={this.addAuthor} onInputAuthor={styleInput} onInputValueUpdate={this.handleInputChange} value={authorName} />
                <AuthorList onRemoveAuthor={this.removeAuthor} onInputAuthor={styleInput} authors={authors} />
            </div>
        );
    }
}

const mapStateToProps = (state: AuthorListState) => {
    return state;
}
export default connect(mapStateToProps, { addAuthor, removeAuthor })(Author);