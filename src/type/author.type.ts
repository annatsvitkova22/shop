import { ADD_AUTHOR, REMOVE_AUTHOR } from '../constants';
import { addAuthor, removeAuthor } from '../actions/actions';

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

}

export interface AuthorProps {
    addAuthor: typeof addAuthor,
    removeAuthor: typeof removeAuthor,
    authors: AuthorModel[],
}

export interface AuthorInputProps {
    value: string,
    onCreateAuthor: () => void,
    onInputValueUpdate: (event: React.ChangeEvent<HTMLInputElement>) => void,
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