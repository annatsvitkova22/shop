import { AuthenticationUserType, AuthenticationPayload } from "../type/user.type";
import { LOGIN } from "../constants";

export const login = (payload: AuthenticationPayload): AuthenticationUserType => ({
    type: LOGIN,
    payload,
  });