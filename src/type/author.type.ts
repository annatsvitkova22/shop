import React, { MouseEvent } from 'react';

import { ADD_AUTHOR, REMOVE_AUTHOR } from '../constants';
import { addAuthor, removeAuthor } from '../actions/author.actions';

export interface AddAuthorPayload {
    name: string,
    id: string,
}

export interface AddAuthorType {
    type: typeof ADD_AUTHOR,
    payload: AddAuthorPayload,
}

export interface RemoveAuthorType {
    id?: string,
    type?: typeof REMOVE_AUTHOR,
}

export type AuthorTypes = AddAuthorType | RemoveAuthorType;

export interface AuthorModel {
    id: string,
    name: string,
    isRemoved?: boolean,
}

export interface AuthorListState {
    authors: AuthorModel[],
    authorName: string,
    check?: boolean,
}

export interface AuthorPostState {
    author: AuthorModel,
    authorName: string,
    labelChangeName: string,
}

export interface RequestOptionsModel {
    method: string;
    headers: Headers;
    body?: string;
}

export interface CreateAuthorModel {
    name: string,
}

export interface EditAuthorModel {
    id: string,
    name: string,
}

export interface UserRoleState {
    style: AuthorStyle
}

export interface TokenPayload {
    firstName: string,
    userId: string,
    role: string,
    iat: Date,
    exp: Date
}

export interface UserHeaderState {
    isAdmin: boolean,
    isUser: boolean,
    isToken: boolean
}

export interface AuthorProps {
    addAuthor: typeof addAuthor,
    removeAuthor: typeof removeAuthor,
    authors: AuthorModel[]
}

export interface AuthorStyle {
    display: string
}

export interface AuthorInputProps {
    value: string,
    onCreateAuthor: () => void,
    onInputValueUpdate: (event: React.ChangeEvent<HTMLInputElement>) => void,
    onCheck: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export interface AuthorListProps {
    authors: AuthorModel[],
    onRemoveAuthor: (id: string) => void,
}

export interface AuthorItemProps {
    id: string,
    name: string;
    onRemoveAuthor: (id: string) => void,
}
