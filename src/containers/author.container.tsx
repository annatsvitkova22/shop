import React, { Component, ReactElement } from 'react';
import { connect } from 'react-redux';

import { addAuthor, removeAuthor } from '../actions/author.actions';
import AuthorInput from '../components/content/author/author-input/author-input';
import AuthorList from '../components/content/author/author-list/author-list';
import { AuthorListState, AuthorProps, CreateAuthorModel, AuthorModel, RequestOptionsModel, AddAuthorPayload, } from '../type/author.type';

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

    handleAddAuthor = () => {
        const { authorName }: AuthorListState = this.state;
        const createAuthor: CreateAuthorModel = {
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
        const token: string | null = localStorage.getItem('accessToken');
        const headers: Headers = new Headers();
        headers.append('Authorization', 'Bearer '+ token);
        const options: RequestOptionsModel = {
            method: 'GET',
            headers,
        };
        const request: Request = new Request(BASE_PATH, options);
        fetch(request)
            .then((res: Response) => res.json())
            .then((authors: AuthorModel[]) => this.setState({ authors }))
            .catch(error => error);
    }

    createAuthor = (data: any): void => {
        const json: string = JSON.stringify(data);
        const headers: Headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const options: RequestOptionsModel = {
            method: 'POST',
            headers,
            body: json,
        };
        const request: Request = new Request(BASE_PATH, options);
        fetch(request)
            .then((res: Response) => res.json())
            .then((createdAuthor: AddAuthorPayload) => this.props.addAuthor(createdAuthor))
            .catch(error => error);
    }

    removeAuthor = (id: string): void => {
        const token: string | null  = localStorage.getItem('accessToken');
        const headers: Headers = new Headers();
        headers.append('Authorization', 'Bearer '+ token);
        const options: RequestOptionsModel = {
            method: 'DELETE',
            headers,
        };

        const path: string = BASE_PATH + id;
        const request: Request = new Request(path, options);
        fetch(request)
            .then((res: Response) => res.json())
            .then((createdAuthor: string) => this.props.removeAuthor(createdAuthor))
            .catch(error => error);
    }

    render(): ReactElement {
        const { authorName, authors }: AuthorListState = this.state;

        return (
            <div className="content">
                <AuthorInput onCreateAuthor={this.handleAddAuthor} onInputValueUpdate={this.handleInputChange} value={authorName} />
                <AuthorList onRemoveAuthor={this.removeAuthor} authors={authors} />
            </div>
        );
    }
}

const mapStateToProps = (state: AuthorListState) => {
    return state;
}
export default connect(mapStateToProps, { addAuthor, removeAuthor })(Author);