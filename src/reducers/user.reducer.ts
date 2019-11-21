import { UserState, UserTypes, AddUserType } from '../type/user.type';
import { ADD_USER } from '../constants';

const USER: UserState = {
    user: {
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        emailConfirmed: false
    },

}

const userReducer = (state: UserState = USER, action: UserTypes): UserState => {
    switch (action.type) {
        case ADD_USER:
            const { payload }: AddUserType = action as AddUserType;
            state.user.id = payload.id;
            state.user.firstName = payload.firstName;
            state.user.lastName = payload.lastName;
            state.user.email = payload.email;
            state.user.emailConfirmed = payload.emailConfirmed;
            return { ...state };

        default:
            return state;
    }

}

export default userReducer;