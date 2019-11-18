import { combineReducers } from "redux";
import authorReducer from './author.reducer';
import userReducer from './user.reducer';
import loginReducer from "./login.reducer";

const rootReducer = combineReducers({
    author: authorReducer,
    user: userReducer,
    login: loginReducer
});

export default rootReducer;