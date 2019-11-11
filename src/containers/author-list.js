import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addAuthor, removeAuthor, completeAuthor } from '../actions/index';
import AuthorInput from '../components/author-input/author-input';
import AuthorList from '../components/author-list/author-list';
import { REMOVE_AUTHOR, ADD_AUTHOR } from '../constants';

import '../components/author.css';

const BASE_PATH = 'https://localhost:443/author/';

class Author extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            tests: [],
            taskText: '',
        });
    }

    handleInputChange = ({ target: { value } }) => {
        this.setState({
            taskText: value,
        })
    }

    addAuthor = () => {
        const { taskText } = this.state;
        const { addAuthor } = this.props;
        const createAuthor = {
            name: taskText,
        };
        
        this.createAuthor(createAuthor);
        addAuthor(taskText);
        this.setState({
            taskText: '',
        });
    }

    deleteAuthor = (id) => {
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

    componentDidUpdate(prevProps) {
        console.log(this.state.tests);
        console.log(this.props.tasks);
        if (this.props.tasks[1] == REMOVE_AUTHOR) {
            this.deleteAuthor(this.props.tasks[0]);
            this.props.tasks[1] = ADD_AUTHOR;
            this.getAllAuthors();
        }
        if (this.props.tasks !== prevProps.tasks) {
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
        const { taskText, tests } = this.state;
        const { removeAuthor } = this.props;

        return (
            <div className="author-wrapper">
                <AuthorInput onClick={this.addAuthor} onChange={this.handleInputChange} value={taskText} />
                <AuthorList onClick={this.deleteAuthor} removeAuthor={removeAuthor} testsList={tests} />
            </div>
        );
    }
}

export default connect(({ tasks }) => ({
    tasks,
}), { addAuthor, removeAuthor, completeAuthor })(Author);
