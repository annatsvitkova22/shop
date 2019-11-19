import React, { Component, ReactElement, MouseEvent} from 'react';
import { connect } from 'react-redux';

import '../components/author.css';
import { addUser } from '../actions/user.action';
import { UserState, UserProps, UserModel, User } from '../type/user.type';
import RegistrationUser from '../components/content/user/create-user';

const BASE_PATH = 'https://192.168.0.104:443/user/';

class CreateUser extends Component<UserProps, UserModel> {
    state: UserModel = ({
        firstName: '',
        lastName: '',
        passwordHash: '',
        email: '',
        formErrors: {
            email: '',
            password: ''
        },
        emailValid: false,
        passwordValid: false,
        formValid: false
    });

    handleInputChangeFirstName = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const { value } = event.target;
        this.setState({
            firstName: value,
        });
        console.log(this.props);
    }

    handleInputChangeLastName = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const { value } = event.target;
        this.setState({
            lastName: value,
        });
    }

    handleInputChangePassword = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const { value } = event.target;
        const { name } = event.target;
        this.setState({
            passwordHash: value },
            () => { this.validateField(name, value) });
    }

    handleInputChangeEmail = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const { value } = event.target;
        const { name } = event.target;
        this.setState({
            email: value,
        });
        this.setState({ email: value },
            () => { this.validateField(name, value) });
    }

    validateField(fieldName: any, value: any) {
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

    handleCreateUser = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const { firstName, lastName, passwordHash, email }: UserModel = this.state;

        const createUser: User = {
            firstName,
            lastName,
            passwordHash,
            email
        };
        this.createUser(createUser);

        this.setState({
            firstName: '',
            lastName: '',
            passwordHash: '',
            email: ''
        });
    }

    componentDidUpdate(prevProps: any) {
        const { user }: any = this.props;

        if (user !== prevProps.user) {

        }
    }

    createUser = (data: any): void => {
        const json = JSON.stringify(data);
        console.log(json);
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const options = {
            method: 'POST',
            headers,
            body: json,
        };

        const url: string = BASE_PATH + 'create/';
        const request = new Request(url, options);
        fetch(request)
            .then(res => res.json())
            .then(createdUser => this.props.addUser(createdUser.userCreateModel))
            .catch(error => error);
    }

    render(): ReactElement {
        const { firstName, lastName, passwordHash, email, formErrors, formValid }: UserModel = this.state;

        return (
            <div className="content">
                <RegistrationUser errorEmail={formErrors.email} errorPassword={formErrors.password} formValid={!formValid} onValidatePassword={this.errorClass(formErrors.password)} onValidateEmail={this.errorClass(formErrors.email)} onCreateUser={this.handleCreateUser} onInputValueUpdateFirstName={this.handleInputChangeFirstName} valueFirstName={firstName} onInputValueUpdateLastName={this.handleInputChangeLastName} valueLastName={lastName} onInputValueUpdatePassword={this.handleInputChangePassword} valuePassword={passwordHash} onInputValueUpdateEmail={this.handleInputChangeEmail} valueEmail={email} />
            </div>
        );
    }
}

const mapStateToProps = (state: UserState) => {
    return state;
}
export default connect(mapStateToProps, { addUser })(CreateUser);
