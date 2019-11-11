import { combineReducers, Reducer } from 'redux';
import tasks from './author';

// interface task {
//     id?: string,
//     name?: string,
//     type?: string;
// }

const rootReducer = combineReducers({ task });

export default rootReducer;