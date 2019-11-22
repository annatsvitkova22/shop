import React, { Component, ReactElement, MouseEvent } from 'react';
import { connect } from 'react-redux';

import { LoginGlobalState } from '../type/user.type';
import { UserHeaderState } from '../type/author.type';
import Header from '../components/header/header';
import { logout } from '../actions/login.action';

class CreateHeader extends Component<any, UserHeaderState>{
    state: UserHeaderState = ({
        isUser: false,
        isAdmin: false,
        isToken: false
    });


    logOut = (event: MouseEvent<HTMLLIElement>): void => {
        event.preventDefault();
        localStorage.removeItem('accessToken');
        this.props.logout({accessToken: "", refreshToken: ""});
    }

    componentDidMount = () => {
        this.roleAuthorInput();
    }

    componentDidUpdate(prevProps: any) {
        if (this.props.login !== prevProps.login) {
            this.roleAuthorInput();
        }
    }


    roleAuthorInput = (): void => {
        const { login } = this.props;
        const token = login.token.accessToken; 
        const jwt = require('jsonwebtoken');
        const payload = jwt.decode(token);
    
        if(payload) {
            const isUser: boolean = payload.role === 'user';
            const isAdmin: boolean = payload.role === 'admin';
            const isToken: boolean = token !== null;
            this.setState({isAdmin, isUser, isToken});
        }
        if(!token){
            this.setState({isToken: false, isAdmin: false, isUser: false});
        }
    }

    render(): ReactElement {
        const { isAdmin, isToken, isUser }: UserHeaderState = this.state;
        console.log(this.props)
        return (
                <Header onLogOut={this.logOut} isAdmin={isAdmin} isUser={isUser} isToken={isToken} />
        );
    }

}
const mapStateToProps = (state: LoginGlobalState) => {
    return state;
}
export default connect(mapStateToProps, {logout})(CreateHeader);