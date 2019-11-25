import React, { Component } from 'react';

import { RequestOptionsModel, AuthorModel, AuthorPostState, AddAuthorPayload, CreateAuthorModel, EditAuthorModel } from '../../../../type/author.type';

const BASE_PATH = 'https://192.168.0.104:443/author/';

class AuthorPost extends Component<any, AuthorPostState> {
  state: AuthorPostState = ({
    author: {
      id: '',
      name: '',
      isRemoved: false
    },
    authorName: '',
    labelChangeName: '',
  });

  componentDidMount = (): void => {
    const { id } = this.props.match.params;
    this.requestGetAuthor(id);
  }

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target;

    this.setState({
      authorName: value,
    });
  }

  handleEditAuthor = () => {
    const { authorName, author }: AuthorPostState = this.state;
    const editAuthor: EditAuthorModel = {
      id: author.id,
      name: authorName,
    };
    this.requestEditAuthor(editAuthor);
    this.setState({ labelChangeName: 'Author name changed to ' + authorName })
  }

  handleRemovaAuthor = (): void => {
    const { id } = this.props.match.params;
    this.requestRemoveAuthor(id);

  }

  requestGetAuthor = (id: string): void => {
    const token: string | null = localStorage.getItem('accessToken');
    const headers: Headers = new Headers();
    headers.append('Authorization', 'Bearer ' + token);
    const options: RequestOptionsModel = {
      method: 'GET',
      headers,
    };

    const url = BASE_PATH + id;

    const request: Request = new Request(url, options);
    fetch(request)
      .then((res: Response) => res.json())
      .then((author: AuthorModel) => this.setState({ author, authorName: author.name }))
      .catch(error => error);
  }

  requestEditAuthor = (data: EditAuthorModel): void => {
    const token: string | null = localStorage.getItem('accessToken');
    const headers: Headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + token);
    const json: string = JSON.stringify(data);

    const options: RequestOptionsModel = {
      method: 'PUT',
      headers,
      body: json,
    };
    const request: Request = new Request(BASE_PATH, options);
    fetch(request)
      .then((res: Response) => res.json())
      .then((createdAuthor: AddAuthorPayload) => this.props.addAuthor(createdAuthor))
      .catch(error => error);
  }

  requestRemoveAuthor = (id: string): void => {
    const token: string | null = localStorage.getItem('accessToken');
    const headers: Headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + token);
    const options: RequestOptionsModel = {
      method: 'PUT',
      headers,
    };

    const url = BASE_PATH + id;
    const request: Request = new Request(url, options);
    fetch(request)
      .then((res: Response) => res.json())
      .then((author: AuthorModel) => this.setState({ author, authorName: '' }))
      .catch(error => error);
  }

  render() {
    const { authorName, author, labelChangeName } = this.state;

    return (
      <div className="author-post">
        {!author.isRemoved && <h2>Author</h2>}
        {!author.isRemoved && <div id='author-input-wrapper' className='author-input'>
          <input
            type='text'
            value={authorName}
            onChange={this.handleInputChange}
          />
          <br />
          <label>{labelChangeName}</label>
          <br />
          <button onClick={this.handleEditAuthor} >Edit</button>
          <button onClick={this.handleRemovaAuthor} >Remove</button>
        </div>}
        {author.isRemoved && <label>Author {author.name} deleted</label>}

      </div>
    );
  }
};

export default AuthorPost;