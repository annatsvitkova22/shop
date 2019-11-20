import { ADD_AUTHOR, REMOVE_AUTHOR } from '../constants';
import { AddAuthorPayload, RemoveAuthorType, AddAuthorType } from '../type/author.type';

export const addAuthor = (payload: AddAuthorPayload): AddAuthorType => ({
  type: ADD_AUTHOR,
  payload,
});

export const removeAuthor = (id: string): RemoveAuthorType => ({
  type: REMOVE_AUTHOR,
  id
});
