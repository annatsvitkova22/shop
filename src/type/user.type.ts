import { ADD_USER } from '../constants';
import { addUser } from '../actions/user.action';

export interface UserPayload {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    emailConfirmed: boolean
}

export interface AddUserType {
    type: typeof ADD_USER,
    payload: UserPayload,
}

export interface UserModel {
    firstName: string,
    lastName: string,
    passwordHash: string,
    email: string
}

export type UserTypes = AddUserType;

export interface UserState {
   user: UserPayload[],
}

export interface UserProps {
    addUser: typeof addUser,
    users: UserModel[],
}

export interface UserInputProps {
    valueFirstName: string,
    onInputValueUpdateFirstName: (event: React.ChangeEvent<HTMLInputElement>) => void,
    valueLastName: string,
    onInputValueUpdateLastName: (event: React.ChangeEvent<HTMLInputElement>) => void,
    valuePassword: string,
    onInputValueUpdatePassword: (event: React.ChangeEvent<HTMLInputElement>) => void,
    valueEmail: string,
    onInputValueUpdateEmail: (event: React.ChangeEvent<HTMLInputElement>) => void,
    
    onCreateUser: () => void,
}