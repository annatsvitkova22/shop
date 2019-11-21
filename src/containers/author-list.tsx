import React, { Component, ReactElement } from 'react';
import { connect } from 'react-redux';

import { addAuthor, removeAuthor } from '../actions/actions';
import AuthorInput from '../components/content/author/author-input/author-input';
import AuthorList from '../components/content/author/author-list/author-list';
import { AuthorListState, AuthorProps, } from '../type/author.type';

import '../components/author.css';

const BASE_PATH = 'https://192.168.0.104:443/author/';


class Author extends Component<AuthorProps, AuthorListState> {
    state: AuthorListState = ({
        authors: [],
        authorName: '',
    });

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
        const token = localStorage.getItem('accessToken');
        const headers = new Headers();
        headers.append('Authorization', 'Bearer '+ token);
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
        console.log(BASE_PATH);
        console.log(options);
        const request = new Request(BASE_PATH, options);
        console.log(request);
        fetch(request)
            .then(res => res.json())
            .then(createdAuthor => this.props.addAuthor(createdAuthor))
            .catch(error => error);
    }

    removeAuthor = (id: string): void => {
        const token = localStorage.getItem('accessToken');
        const headers = new Headers();
        headers.append('Authorization', 'Bearer '+ token);
        const options = {
            method: 'DELETE',
            headers,
        };

        const path = BASE_PATH + id;
        const request = new Request(path, options);
        console.log(request);
        fetch(request)
            .then(res => res.json())
            .then(createdAuthor => this.props.removeAuthor(createdAuthor))
            .catch(error => error);
    }

    render(): ReactElement {
        const { authorName, authors }: AuthorListState = this.state;

        return (
            <div className="content">
                <AuthorInput onCreateAuthor={this.addAuthor} onInputValueUpdate={this.handleInputChange} value={authorName} />
                <AuthorList onRemoveAuthor={this.removeAuthor} authors={authors} />
            </div>
        );
    }
}

const mapStateToProps = (state: AuthorListState) => {
    return state;
}
export default connect(mapStateToProps, { addAuthor, removeAuthor })(Author);