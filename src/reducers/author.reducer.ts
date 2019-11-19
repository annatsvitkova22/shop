import { ADD_AUTHOR, REMOVE_AUTHOR } from '../constants';
import { AuthorListState, AuthorTypes, AddAuthorType, RemoveAuthorType } from '../type/author.type';

const AUTHORS: AuthorListState = {
    authors: [],
    authorName: '',
    styleInput: {display: ''},
    styleDelete: {display: ''}
}

const authorReducer = (state: AuthorListState = AUTHORS, action: AuthorTypes): AuthorListState => {
    switch (action.type) {
        case ADD_AUTHOR:
            const {payload}: AddAuthorType = action as AddAuthorType;
            state.authors.push(payload);
            return {...state};

        case REMOVE_AUTHOR:
             const {id}: RemoveAuthorType = action as RemoveAuthorType;
            return {...state, ...{authors: state.authors.filter(author => author.id !== id)}};

        default:
            return state;
    }
}

export default authorReducer;