import { ADD_USER, LOGIN } from '../constants';
import { addUser } from '../actions/user.action';
import { login } from '../actions/login.action';

export interface UserPayload {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    emailConfirmed: boolean
}

export interface AuthenticationPayload {
    accessToken: string,
    refreshToken: string,
}


export interface AddUserType {
    type: typeof ADD_USER,
    payload: UserPayload,
}

export interface AuthenticationUserType {
    type: typeof LOGIN,
    payload: AuthenticationPayload,
}

export interface UserModel {
    firstName: string,
    lastName: string,
    passwordHash: string,
    email: string,
    formErrors: {
        email: string, 
        password: string 
       },
   emailValid: boolean,
   passwordValid: boolean,
   formValid: boolean
}

export interface LoginState {
    password: string,
    username: string,
    formErrors: {
        email: string, 
        password: string 
       },
   emailValid: boolean,
   passwordValid: boolean,
   formValid: boolean
}

export interface User {
    firstName: string,
    lastName: string,
    passwordHash: string,
    email: string
}

export interface LoginUserModel {
    password: string,
    username: string
}

export type UserTypes = AddUserType;

export type AuthenticationTypes = AuthenticationUserType;

export interface UserState {
    user: UserPayload[],
}

export interface LoginGlobalState {
    token: AuthenticationPayload[],
}

export interface UserProps {
    addUser: typeof addUser,
    users: UserModel[],
}

export interface LoginProps {
    login: typeof login,
    token: AuthenticationPayload,
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
    onValidateEmail: string,
    onValidatePassword: string,
    formValid: boolean,
    errorPassword: string,
    errorEmail: string,
    onCreateUser: () => void,
}

export interface AuthenticationInputProps {
    valuePassword: string,
    onInputValueUpdatePassword: (event: React.ChangeEvent<HTMLInputElement>) => void,
    valueEmail: string,
    onInputValueUpdateEmail: (event: React.ChangeEvent<HTMLInputElement>) => void,
    onValidateEmail: string,
    onValidatePassword: string,
    formValid: boolean,
    errorPassword: string,
    errorEmail: string,
    onCreateUser: () => void,
}

export interface Validate {
    firstName?: string,
    lastName?: string,
    email?: string
}
