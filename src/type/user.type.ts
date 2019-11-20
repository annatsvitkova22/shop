import React, { MouseEvent, ChangeEvent } from 'react';
import { ADD_USER, LOGIN, LOGOUT } from '../constants';
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
    payloadIn: AuthenticationPayload,
}

export interface LogoutUserType {
    type: typeof LOGOUT,
    payloadOut: AuthenticationPayload,
}

export type LogTypes = AuthenticationUserType | LogoutUserType;

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
   formValid: boolean,
   isRegistration: boolean
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
   formValid: boolean,
   isRegistration: boolean
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
    token: AuthenticationPayload,
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
    onInputValueUpdateFirstName: (event: ChangeEvent<HTMLInputElement>) => void,
    valueLastName: string,
    onInputValueUpdateLastName: (event: ChangeEvent<HTMLInputElement>) => void,
    valuePassword: string,
    onInputValueUpdatePassword: (event: ChangeEvent<HTMLInputElement>) => void,
    valueEmail: string,
    onInputValueUpdateEmail: (event: ChangeEvent<HTMLInputElement>) => void,
    onValidateEmail: string,
    onValidatePassword: string,
    formValid: boolean,
    errorPassword: string,
    errorEmail: string,
    isRegistration: boolean,
    onCreateUser: (event: MouseEvent<HTMLButtonElement>) => void,
}

export interface AuthenticationInputProps {
    valuePassword: string,
    onInputValueUpdatePassword: (event: ChangeEvent<HTMLInputElement>) => void,
    valueEmail: string,
    onInputValueUpdateEmail: (event: ChangeEvent<HTMLInputElement>) => void,
    onValidateEmail: string,
    onValidatePassword: string,
    formValid: boolean,
    errorPassword: string,
    errorEmail: string,
    isRegistration: boolean,
    onCreateUser: (event: MouseEvent<HTMLButtonElement>) => void,
}

export interface Validate {
    firstName?: string,
    lastName?: string,
    email?: string
}

export interface HeaderProps{
    isAdmin: boolean,
    isUser: boolean,
    isToken: boolean,
    onLogOut: (event: MouseEvent<HTMLLIElement>) => void,
}
