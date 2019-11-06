import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { add } from '../actions/index';

class AuthorList extends Component {
    addAuthor() {
        console.log(this.state);
        this.props.onAddAuthor(this.authorInput.value);
        this.authorInput.value = '';
        console.log(this.props);
    }

    showList() {
        return this.props.authors.map((author) => {
            return (<li onClick={() => this.props.add(author)}
            >{author.name}</li>
            );
        });
    }

    render() {
        return (
            <div>
                <h2>Authors</h2>
                <input type="text" ref={(input) => { this.authorInput = input }} />
                <button onClick={this.addAuthor.bind(this)}>Add author</button>
                {/* <ul>
                    {this.props.testAuthor.map((author, index) =>
                        <li key={index}>{author}</li>
                    )}
                </ul> */}
                <ul>
                    {this.showList()}
                </ul>
            </div>
        );
    }
}

// function mapStateToProps(state) {
//     return {
//         authors: state.authors
//     };
// }

// function matchDispatchToProps(dispatch) {
//     return bindActionCreators({ add: add }, dispatch)
// }

export default connect(state => ({
    testAuthor: state,
    authors: state.authors,
}),
    dispatch => ({
        onAddAuthor: (author) => {
            dispatch({ type: 'ADD_AUTHOR', payload: author })
        }
    })
)(AuthorList);


// export default connect(mapStateToProps)(AuthorList);