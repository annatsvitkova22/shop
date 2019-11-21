import React, { Component, ReactElement, MouseEvent } from 'react';
import { connect } from 'react-redux';

import '../components/author.css';
import { addUser } from '../actions/user.action';
import { UserState, UserProps, UserModel, User, UserPayload } from '../type/user.type';
import RegistrationUser from '../components/content/user/create-user';

const BASE_PATH = 'https://192.168.0.104:443/user/';

class CreateUser extends Component<any, UserModel> {
    state: UserModel = ({
        firstName: '',
        lastName: '',
        passwordHash: '',
        email: '',
        formErrors: {
            email: '',
            password: '',
            firstName: '',
            lastName: ''
        },
        emailValid: false,
        passwordValid: false,
        firstNameValid: false,
        lastNameValid: false,
        formValid: false,
        isRegistration: false,
        isUser: false
    });

    handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const { value } = event.target;
        const { name } = event.target;
        switch (name) {
            case 'email':
                this.setState({ email: value },
                    () => { this.validateField(name, value) });
                break;
            case 'password':
                this.setState({ passwordHash: value },
                    () => { this.validateField(name, value) });
                break;
            case 'firstName':
                this.setState({ firstName: value },
                    () => { this.validateField(name, value) });
                break;
            case 'lastName':
                this.setState({ lastName: value },
                    () => { this.validateField(name, value) });
                break;
            default:
                break;
        }
    }

    validateField(fieldName: any, value: any) {
        let fieldValidationErrors = this.state.formErrors;
        let emailValid = this.state.emailValid;
        let passwordValid = this.state.passwordValid;
        let firstNameValid = this.state.firstNameValid;
        let lastNameValid =this.state.lastNameValid;

        switch (fieldName) {
            case 'email':
                emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldValidationErrors.email = emailValid ? '' : 'Email is invalid';
                break;
            case 'password':
                passwordValid = value.length >= 6;
                fieldValidationErrors.password = passwordValid ? '' : 'Password is too short';
                break;
            case 'firstName':
                passwordValid = value.length >= 2;
                fieldValidationErrors.firstName = firstNameValid ? '' : 'First name is too short';
                break;
            case 'lastName':
                passwordValid = value.length >= 2;
                fieldValidationErrors.lastName = lastNameValid ? '' : 'Last name is too short';
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

    handleCreateUser = async (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const { firstName, lastName, passwordHash, email }: UserModel = this.state;

        const createUser: User = {
            firstName,
            lastName,
            passwordHash,
            email
        };
        const createdUser: UserPayload = await this.createUser(createUser);
        this.validateData(createdUser);

    }

    validateData = (user: UserPayload) => {
        if (user.id) {
            this.setState({ isRegistration: true, isUser: false });
            this.props.addUser(user);
        }
        if (!user.id) {
            this.setState({ isUser: true })
        }

        this.setState({
            firstName: '',
            lastName: '',
            passwordHash: '',
            email: '',
        });
    }

    createUser = async (data: any): Promise<UserPayload> => {
        const json = JSON.stringify(data);
        console.log(json);
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const options = {
            method: 'POST',
            headers,
            body: json,
        };

        let user: UserPayload = {} as UserPayload;

        const url: string = BASE_PATH + 'create/';
        const request = new Request(url, options);
        await fetch(request)
            .then(res => res.json())
            .then(createdUser => {
                user.id = createdUser.userCreateModel.id;
                user.firstName = createdUser.userCreateModel.firstName;
                user.lastName = createdUser.userCreateModel.lastName;
                user.emailConfirmed = createdUser.userCreateModel.emailConfirmed;
                user.email = createdUser.userCreateModel.email;
            })
            .catch(error => error);

        return user;
    }

    render(): ReactElement {
        const { firstName, isUser, lastName, passwordHash, email, formErrors, formValid, isRegistration }: UserModel = this.state;

        return (
            <div className="content">
                <RegistrationUser isUser={isUser} isRegistration={isRegistration} errorEmail={formErrors.email} errorPassword={formErrors.password} formValid={!formValid} onValidatePassword={this.errorClass(formErrors.password)} onValidateEmail={this.errorClass(formErrors.email)} onCreateUser={this.handleCreateUser} onInputValueUpdateFirstName={this.handleInputChange} valueFirstName={firstName} onInputValueUpdateLastName={this.handleInputChange} valueLastName={lastName} onInputValueUpdatePassword={this.handleInputChange} valuePassword={passwordHash} onInputValueUpdateEmail={this.handleInputChange} valueEmail={email} />
            </div>
        );
    }
}

const mapStateToProps = (state: UserState) => {
    return state;
}
export default connect(mapStateToProps, { addUser })(CreateUser);
