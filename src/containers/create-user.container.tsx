import React, { Component, ReactElement, MouseEvent } from 'react';
import { connect } from 'react-redux';

import '../components/author.css';
import { addUser } from '../actions/user.action';
import { UserState, UserModelState, User, UserPayload, ErrorsModel, userCreateModel } from '../type/user.type';
import RegistrationUser from '../components/content/user/create-user';
import { RequestOptionsModel } from '../type/author.type';

const BASE_PATH = 'https://192.168.0.104:443/user/';

class CreateUser extends Component<any, UserModelState> {
    state: UserModelState = ({
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
    
    validateField(fieldName: string, value: any) {
        let fieldValidationErrors: ErrorsModel = this.state.formErrors;
        let emailValid: boolean = this.state.emailValid;
        let passwordValid: boolean = this.state.passwordValid;
        let firstNameValid: boolean = this.state.firstNameValid;
        let lastNameValid: boolean =this.state.lastNameValid;

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
                firstNameValid = value.length >= 2;
                fieldValidationErrors.firstName = firstNameValid ? '' : 'First name is too short';
                break;
            case 'lastName':
                lastNameValid = value.length >= 2;
                fieldValidationErrors.lastName = lastNameValid ? '' : 'Last name is too short';
                break;
            default:
                break;
        }

        this.setState({
            formErrors: fieldValidationErrors,
            emailValid: emailValid,
            passwordValid: passwordValid,
            firstNameValid: firstNameValid,
            lastNameValid: lastNameValid,
        }, this.validateForm);
    }

    validateForm() {
        const { emailValid, passwordValid, firstNameValid, lastNameValid } = this.state; 
        this.setState({ formValid: emailValid && passwordValid && firstNameValid && lastNameValid });
    }

    errorClass = (error: string) => {
        return (error.length === 0 ? '' : 'has-error');
    }

    handleCreateUser = async (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const { firstName, lastName, passwordHash, email }: UserModelState = this.state;

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
        const json: string = JSON.stringify(data);
        const headers: Headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const options: RequestOptionsModel = {
            method: 'POST',
            headers,
            body: json,
        };

        let user: UserPayload = {} as UserPayload;

        const url: string = BASE_PATH + 'create/';
        const request: Request = new Request(url, options);
        await fetch(request)
            .then((res: Response)=> res.json())
            .then((createdUser: userCreateModel) => {
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
        const { firstName, isUser, lastName, passwordHash, email, formErrors, formValid, isRegistration }: UserModelState = this.state;

        return (
            <div className="content">
                <RegistrationUser onValidateFirstName={this.errorClass(formErrors.firstName)} onValidateLastName={this.errorClass(formErrors.lastName)} isUser={isUser} isRegistration={isRegistration} errorEmail={formErrors.email} errorFirstName={formErrors.firstName} errorLastName={formErrors.lastName} errorPassword={formErrors.password} formValid={!formValid} onValidatePassword={this.errorClass(formErrors.password)} onValidateEmail={this.errorClass(formErrors.email)} onCreateUser={this.handleCreateUser} onInputValueUpdateFirstName={this.handleInputChange} valueFirstName={firstName} onInputValueUpdateLastName={this.handleInputChange} valueLastName={lastName} onInputValueUpdatePassword={this.handleInputChange} valuePassword={passwordHash} onInputValueUpdateEmail={this.handleInputChange} valueEmail={email} />
            </div>
        );
    }
}

const mapStateToProps = (state: UserState) => {
    return state;
}
export default connect(mapStateToProps, { addUser })(CreateUser);
