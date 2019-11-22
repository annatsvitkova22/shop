export interface ForgotPasswordModel {
    email: string,
}

export interface UserInfoModel {
    user?: User,
    userCreateModel?: CreateUserModel,
    message?: string,
}

export interface User {
    id: string,
    firstName: string,
    lastName: string,
    passwordHash: string,
    email: string,
    salt: string,
    saltForEmail: string,
    emailConfirmed: boolean,
}

export interface CreateUserModel {
    firstName?: string;
    lastName?: string;
    passwordHash?: string;
    email?: string;
    salt?: string;
}