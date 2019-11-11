import { ADD_AUTHOR, REMOVE_AUTHOR, COMPLETE_AUTHOR } from '../constants';

export const addAuthor = (name: string) => ({
  type: ADD_AUTHOR,
  name
});

export const removeAuthor = (id: string) => ({
  type: REMOVE_AUTHOR,
  id
});

export const completeAuthor = (id: string) => ({
  type: COMPLETE_AUTHOR,
  id
});
