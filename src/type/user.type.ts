import React, { MouseEvent, ChangeEvent } from 'react';
import { ADD_USER, LOGIN, LOGOUT } from '../constants';
import { addUser } from '../actions/user.action';
import { singIn } from '../actions/login.action';

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
        firstName: string,
        lastName: string,
       },
   emailValid: boolean,
   passwordValid: boolean,
   firstNameValid: boolean,
   lastNameValid: boolean,
   formValid: boolean,
   isRegistration: boolean,
   isUser: boolean,
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
   isRegistration: boolean,
   isValidateData: boolean,
   isForgotPassword: boolean,
   isSendMail: boolean,
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
    user: UserPayload,
}

export interface LoginGlobalState {
    token: AuthenticationPayload,
}

export interface UserProps {
    addUser: typeof addUser,
    users: UserModel[],
}

export interface LoginProps {
    singIn: typeof singIn,
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
    onValidateLastName: string,
    onValidateFirstName: string,
    formValid: boolean,
    errorPassword: string,
    errorEmail: string,
    errorFirstName: string,
    errorLastName: string,
    isRegistration: boolean,
    isUser: boolean,
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
    isValidateData: boolean,
    isForgotPassword: boolean,
    isSendMail: boolean,
    onSendLetter: (event: MouseEvent<HTMLButtonElement>) => void,
    onPasswordRecovery: (event: MouseEvent<HTMLParagraphElement>) => void,
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
