import React, { Component, ReactElement, MouseEvent } from 'react';
import { LoginUserModel, LoginState, LoginProps } from '../type/user.type';
import { singIn } from '../actions/login.action';
import { connect } from 'react-redux';
import LoginUser from '../components/content/login/login';

const BASE_PATH = 'https://192.168.0.104:443/api/login/';

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
        isValidateData: false
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

    validateField(fieldName: string, value: any) {
        let fieldValidationErrors = this.state.formErrors;
        let emailValid = this.state.emailValid;
        let passwordValid = this.state.passwordValid;
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

    validateForm() {
        this.setState({ formValid: this.state.emailValid && this.state.passwordValid });
    }

    errorClass = (error: string) => {
        return (error.length === 0 ? '' : 'has-error');
    }

    handleLoginUser = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const { password, username }: LoginState = this.state;

        const loginUser: LoginUserModel = {
            password,
            username
        };
        this.loginRequestUser(loginUser);
    }

    addTokenToLocalStorage = () => {
        const { login } = this.props;
        if (login.token.accessToken) {
            localStorage.setItem('accessToken', login.token.accessToken);
            this.setState({ password: '', username: '', isRegistration: true });
        }
        if (!login.token.accessToken) {
            this.setState({ password: '', username: '', isValidateData: true });
        }
    }

    componentDidUpdate(prevProps: any) {
        const { login }: any = this.props;
        if (login !== prevProps.login) {
            this.addTokenToLocalStorage();
        }
    }

    loginRequestUser = (data: LoginUserModel): void => {
        const json = JSON.stringify(data);
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');

        const options = {
            method: 'POST',
            headers,
            body: json,
        };
        const request = new Request(BASE_PATH, options);
        fetch(request)
            .then(res => res.json())
            .then(createdUser => this.props.singIn(createdUser))
            .catch(error => error);
    }

    render(): ReactElement {
        const { password, username, formErrors, formValid, isRegistration, isValidateData }: LoginState = this.state;

        return (
            <div className="content">
                <LoginUser isValidateData={isValidateData} isRegistration={isRegistration} errorEmail={formErrors.email} errorPassword={formErrors.password} formValid={!formValid} onValidatePassword={this.errorClass(formErrors.password)} onValidateEmail={this.errorClass(formErrors.email)} onCreateUser={this.handleLoginUser} onInputValueUpdatePassword={this.handleInputChange} valuePassword={password} onInputValueUpdateEmail={this.handleInputChange} valueEmail={username} />
            </div>
        );
    }
}

const mapStateToProps = (state: LoginState) => {
    return state;
}
export default connect(mapStateToProps, { singIn })(Login);
