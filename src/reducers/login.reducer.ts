import { LoginGlobalState, AuthenticationUserType, AuthenticationTypes } from '../type/user.type';
import { LOGIN } from '../constants';

const TOKEN: LoginGlobalState = {
    token: [],

}

const loginReducer = (state: LoginGlobalState = TOKEN, action: AuthenticationTypes): LoginGlobalState => {
    switch (action.type) {
        case LOGIN:
            const { payload }: AuthenticationUserType = action as AuthenticationUserType;
            state.token.push(payload);
            return { ...state };
            
        default:
            return state;
    }

}

export default loginReducer;