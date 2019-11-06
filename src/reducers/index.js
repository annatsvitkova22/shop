import { combineReducers } from 'redux';
import AuthorsReducers from './author';
import ActiveAuthor from './author-active';

const allReducers = combineReducers ({
    authors: AuthorsReducers,
    active: ActiveAuthor,
});

export default allReducers;