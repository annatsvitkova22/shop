import { UserState, UserPayload, UserTypes, AddUserType } from '../type/user.type';
import { ADD_USER } from '../constants';

const USER: UserState = {
    user: [],

}

const userReducer = (state: UserState = USER, action: UserTypes): UserState => {
    switch (action.type) {
        case ADD_USER:
            const { payload }: AddUserType = action as AddUserType;
            state.user.push(payload);
            return { ...state };
            
        default:
            return state;
    }

}

export default userReducer;