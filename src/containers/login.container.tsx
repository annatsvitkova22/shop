import React, { Component, ReactElement, MouseEvent } from 'react';
import { connect } from 'react-redux';

import { LoginUserModel, LoginState, fieldValidationErrors, AuthenticationPayload } from '../type/user.type';
import { singIn } from '../actions/login.action';
import LoginUser from '../components/content/login/login';
import { ForgotPasswordModel, UserInfoModel, UserModel } from '../type/forgot-password.type';
import { RequestOptionsModel } from '../type/author.type';

const BASE_PATH = 'https://192.168.0.104:443/api/login/';
const BASE_USER = 'https://192.168.0.104:443/user/';

class Login extends Component<any, LoginState> {
    state: LoginState = ({
        password: '',
        username: '',
        formErrors: {
            email: '',
            password: ''
        },
        emailValid: false,
        passwordValid: false,
        formValid: false,
        isRegistration: false,
        isValidateData: false,
        isForgotPassword: true,
        isSendMail: false
    });

    handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const { value } = event.target;
        const { name } = event.target;
        switch (name) {
            case 'email':
                this.setState({ username: value },
                    () => { this.validateField(name, value) });
                break;
            case 'password':
                this.setState({ password: value },
                    () => { this.validateField(name, value) });
                break;
            default:
                break;
        }
    }

    validateField = (fieldName: string, value: any): void => {
        let fieldValidationErrors: fieldValidationErrors = this.state.formErrors;
        let emailValid: boolean = this.state.emailValid;
        let passwordValid: boolean = this.state.passwordValid;
        switch (fieldName) {
            case 'email':
                emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldValidationErrors.email = emailValid ? '' : 'Email is invalid';
                break;
            case 'password':
                passwordValid = value.length >= 6;
                fieldValidationErrors.password = passwordValid ? '' : 'Password is too short';
                break;
            default:
                break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            emailValid: emailValid,
            passwordValid: passwordValid
        }, this.validateForm);
    }

    validateForm = (): void => {
        this.setState({ formValid: this.state.emailValid && this.state.passwordValid });
    }

    errorClass = (error: string): string => {
        return (error.length === 0 ? '' : 'has-error');
    }

    handleLoginUser = (event: MouseEvent<HTMLButtonElement>): void => {
        event.preventDefault();
        const { password, username }: LoginState = this.state;

        const loginUser: LoginUserModel = {
            password,
            username
        };
        this.loginRequestUser(loginUser);
    }

    addTokenToLocalStorage = (): void => {
        const { login } = this.props;
        if (login.token.accessToken) {
            localStorage.setItem('accessToken', login.token.accessToken);
            this.setState({ password: '', username: '', isRegistration: true });
        }
        if (!login.token.accessToken) {
            this.setState({ password: '', username: '', isValidateData: true });
        }
    }

    forgotPassword = async (event: MouseEvent<HTMLParagraphElement>): Promise<void> => {
        event.preventDefault();
        this.setState({ isForgotPassword: false });
    }

    sendLetter = async (event: MouseEvent<HTMLButtonElement>): Promise<void> => {
        event.preventDefault();
        const { username }: LoginState = this.state;
        const userName: ForgotPasswordModel = {
            email: username
        };

        const user: UserInfoModel = await this.forgotPasswordRequest(userName);
        if (user) {
            this.setState({isForgotPassword: true, isSendMail: true})
        }

    }

    forgotPasswordRequest = async (data: ForgotPasswordModel): Promise<UserInfoModel> => {
        const json: string = JSON.stringify(data);
        const headers: Headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const options: RequestOptionsModel = {
            method: 'POST',
            headers,
            body: json,
        };

        let user: UserInfoModel = {};

        const url: string = BASE_USER + 'forgotPassword/'
        const request: Request = new Request(url, options);
        await fetch(request)
            .then((res: Response) => res.json())
            .then((createdUser: UserModel) => user = createdUser.user )
            .catch(error => error);
            
        return user;
    }

    componentDidUpdate(prevProps: any) {
        const { login }: any = this.props;
        if (login !== prevProps.login) {
            this.addTokenToLocalStorage();
        }
    }

    loginRequestUser = (data: LoginUserModel): void => {
        const json: string = JSON.stringify(data);
        const headers: Headers = new Headers();
        headers.append('Content-Type', 'application/json');

        const options: RequestOptionsModel = {
            method: 'POST',
            headers,
            body: json,
        };
        const request: Request = new Request(BASE_PATH, options);
        fetch(request)
            .then((res: Response) => res.json())
            .then((createdUser: AuthenticationPayload) => this.props.singIn(createdUser))
            .catch(error => error);
    }

    render(): ReactElement {
        const { password, username, formErrors, isSendMail, formValid, isForgotPassword, isRegistration, isValidateData }: LoginState = this.state;

        return (
            <div className="content">
                <LoginUser isSendMail={isSendMail} onSendLetter={this.sendLetter} isForgotPassword={isForgotPassword} onPasswordRecovery={this.forgotPassword} isValidateData={isValidateData} isRegistration={isRegistration} errorEmail={formErrors.email} errorPassword={formErrors.password} formValid={!formValid} onValidatePassword={this.errorClass(formErrors.password)} onValidateEmail={this.errorClass(formErrors.email)} onCreateUser={this.handleLoginUser} onInputValueUpdatePassword={this.handleInputChange} valuePassword={password} onInputValueUpdateEmail={this.handleInputChange} valueEmail={username} />
            </div>
        );
    }
}

const mapStateToProps = (state: LoginState) => {
    return state;
}
export default connect(mapStateToProps, { singIn })(Login);
