import { LoginGlobalState, AuthenticationUserType, AuthenticationTypes } from '../type/user.type';
import { LOGIN } from '../constants';
import { switchStatement } from '@babel/types';

const TOKEN: LoginGlobalState = {
    token: [],

}

const loginReducer = (state: LoginGlobalState = TOKEN, action: AuthenticationTypes): LoginGlobalState => {
    switch (action.type) {
        case LOGIN:
            const { payload }: AuthenticationUserType = action as AuthenticationUserType;
            state.token.pop();
            state.token.push(payload);
            localStorage.setItem('accessToken', state.token[0].accessToken);
            return { ...state };
            
        default:
            return state;
    }
}

export default loginReducer;