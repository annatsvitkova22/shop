import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addAuthor, removeAuthor, completeAuthor } from '../actions/index';
import AuthorInput from '../components/author-input/author-input';
import AuthorList from '../components/author-list/author-list';
import { REMOVE_AUTHOR, ADD_AUTHOR } from '../constants';

import '../components/author.css';

const BASE_PATH = 'https://localhost:443/author/';
interface test {
    id?: string,
    name?: string,
    isRemoved?: boolean
}
interface IState {
    tests?: test[],
    taskText?: '',
}
interface IProps {
    addAuthor?: string[],
    removeAuthor?: string[],
    tasks?: string[],
}

class Author extends Component {
    constructor(props: IState) {
        super(props);
        this.state = ({
            tests: [],
            taskText: '',
        });
    }

    handleInputChange = ({ target: { value } }: any) => {
        this.setState({
            taskText: value,
        })
    }

    addAuthor = () => {
        const { taskText }: IState = this.state;
        const { addAuthor }: any = this.props;
        const createAuthor = {
            name: taskText,
        };
        
        this.createAuthor(createAuthor);
        addAuthor(taskText);
        this.setState({
            taskText: '',
        });
    }

    deleteAuthor = (id: string) => {
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
            .then(tests => this.setState({ tests }))
            .catch(error => error);
    }

    componentDidMount = () => {
        this.getAllAuthors();
    }

    componentDidUpdate(prevProps: IProps) {
        const { tasks }: any = this.props;

        if (tasks[1] == REMOVE_AUTHOR) {
            this.deleteAuthor(tasks[0]);
            tasks[1] = ADD_AUTHOR;
            this.getAllAuthors();
        }
        if (tasks !== prevProps.tasks) {
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

    createAuthor = (data: test) => {
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
        const { taskText, tests }: IState = this.state;
        const { removeAuthor }: any = this.props;

        return (
            <div className="author-wrapper">
                <AuthorInput onClick={this.addAuthor} onChange={this.handleInputChange} value={taskText} />
                <AuthorList onClick={this.deleteAuthor} removeAuthor={removeAuthor} testsList={tests} />
            </div>
        );
    }
}

export default connect(({ tasks }: IProps) => ({
    tasks,
}), { addAuthor, removeAuthor, completeAuthor })(Author);
