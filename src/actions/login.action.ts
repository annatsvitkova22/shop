import { AuthenticationUserType, AuthenticationPayload, LogoutUserType } from "../type/user.type";
import { LOGIN, LOGOUT } from "../constants";

export const login = (payloadIn: AuthenticationPayload): AuthenticationUserType => ({
  type: LOGIN,
  payloadIn,
});

export const logout = (payloadOut: AuthenticationPayload): LogoutUserType => {
  return ({
    type: LOGOUT,
    payloadOut,
  });
};