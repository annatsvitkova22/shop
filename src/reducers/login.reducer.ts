import { LoginGlobalState, AuthenticationUserType, LogTypes, LogoutUserType } from '../type/user.type';
import { LOGIN, LOGOUT } from '../constants';

const TOKEN: LoginGlobalState = {
    token: {
        accessToken: '',
        refreshToken: ''
    }
}

const loginReducer = (state: LoginGlobalState = TOKEN, action: LogTypes): LoginGlobalState => {
    switch (action.type) {
        case LOGIN:
            const { payloadIn }: AuthenticationUserType = action as AuthenticationUserType;
            state.token.accessToken = payloadIn.accessToken;
            state.token.refreshToken = payloadIn.refreshToken;
            if(state.token) {
                console.log('dsfdsf')
                localStorage.setItem('accessToken', state.token.accessToken);
            }
            return { ...state };
        case LOGOUT:
            const { payloadOut }: LogoutUserType = action as LogoutUserType;
            state.token = payloadOut;
            return { ...state };

        default:
            return state;
    }
}

export default loginReducer;