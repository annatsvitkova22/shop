import { ADD_AUTHOR, REMOVE_AUTHOR, COMPLETE_AUTHOR } from '../constants';

export const addAuthor = (name, isCompleted) => ({
  type: ADD_AUTHOR,
  name,
  isCompleted
});

export const removeAuthor = id => ({
  type: REMOVE_AUTHOR,
  id
});

export const completeAuthor = id => ({
  type: COMPLETE_AUTHOR,
  id
});
