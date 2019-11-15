import React, { Component, ReactElement } from 'react';
import { connect } from 'react-redux';

import '../components/author.css';
import { addUser } from '../actions/user.action';
import { UserState, UserProps, UserModel } from '../type/user.type';
import RegistrationUser from '../components/content/user/create-user';

const BASE_PATH = 'https://192.168.0.104:443/user/';

class CreateUser extends Component<UserProps, UserModel> {
    state: UserModel = ({
        firstName: '',
        lastName: '',
        passwordHash: '',
        email: ''
    });

    handleInputChangeFirstName = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const { value } = event.target;
        this.setState({
            firstName: value,
        });
    }

    handleInputChangeLastName = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const { value } = event.target;
        this.setState({
            lastName: value,
        });
    }

    handleInputChangePassword = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const { value } = event.target;
        this.setState({
            passwordHash: value,
        });
    }

    handleInputChangeEmail = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const { value } = event.target;
        this.setState({
            email: value,
        });
    }



    addUser = () => {
        const { firstName, lastName, passwordHash, email }: UserModel = this.state;

        const createUser: UserModel = {
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
        console.log(this.props);
        fetch(request)
            .then(res => res.json())
            .then(createdUser => this.props.addUser( createdUser.userCreateModel ))
            .catch(error => error);
    }



    render(): ReactElement {
        const { firstName, lastName, passwordHash, email }: UserModel = this.state;

        return (
            <div className="content">
                <RegistrationUser onCreateUser={this.addUser} onInputValueUpdateFirstName={this.handleInputChangeFirstName} valueFirstName={firstName} onInputValueUpdateLastName={this.handleInputChangeLastName} valueLastName={lastName} onInputValueUpdatePassword={this.handleInputChangePassword} valuePassword={passwordHash} onInputValueUpdateEmail={this.handleInputChangeEmail} valueEmail={email} />
            </div>
        );
    }
}

const mapStateToProps = (state: UserState) => {
    return state;
}
export default connect(mapStateToProps, { addUser })(CreateUser);
