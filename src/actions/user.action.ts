import { UserPayload, AddUserType } from "../type/user.type";
import { ADD_USER } from "../constants";

export const addUser = (payload: UserPayload): AddUserType => ({
    type: ADD_USER,
    payload,
  });