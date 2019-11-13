import { combineReducers } from "redux";
import authorReducer from './author.reducer'

const rootReducer = combineReducers({ author: authorReducer });

export default rootReducer;