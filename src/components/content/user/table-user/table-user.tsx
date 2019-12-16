import React, { Component, ChangeEvent } from 'react';
import Select, { } from "react-select";

import { UserTableState, UserModel, RoleModel, UpdateUserRole } from '../../../../type/user.type';
import { RequestOptionsModel } from '../../../../type/author.type';
import { SelectModel } from '../../../../type/book.type';

const USER_PATH = 'https://192.168.0.104:443/user/';
const ROLE_PATH = 'https://192.168.0.104:443/role/';
const USER_ROLE_PATH = 'https://192.168.0.104:443/role-user/';

class UserTable extends Component<any, UserTableState> {
    state: UserTableState = ({
        isRoleUser: false,
        user: [],
        isEdit: false,
        roleOptions: [],
        userId: '',
        selectedRole: ''
    });

    componentDidMount = async (): Promise<void> => {
        await this.roleUser();
        await this.getUsers();
        await this.getAllRole();

    }

    roleUser = async (): Promise<void> => {
        const token = localStorage.getItem('accessToken');
        const jwt = require('jsonwebtoken');
        const payload = jwt.decode(token);
        if (token) {
            if (payload.role === 'user') {
                await this.setState({ isRoleUser: true });
            }
        }
        if (!token) {
            this.setState({ isRoleUser: true });
        }
    }

    getAllRole = async (): Promise<void> => {
        const token: string | null = localStorage.getItem('accessToken');
        const headers: Headers = new Headers();
        headers.append('Authorization', 'Bearer ' + token);
        const options: RequestOptionsModel = {
            method: 'GET',
            headers,
        };

        const request: Request = new Request(ROLE_PATH, options);
        await fetch(request)
            .then((res: Response) => res.json())
            .then((roles: RoleModel[]) => {
                const mas: UserTableState = {} as UserTableState;
                mas.roleOptions = [];

                for (let i = 0; i < roles.length; i++) {
                    const sel: SelectModel = {} as SelectModel;
                    sel.value = roles[i].id;
                    sel.label = roles[i].name;

                    mas.roleOptions.push(sel);
                }
                this.setState({ roleOptions: mas.roleOptions })
            })
            .catch(error => error);
    }

    getUsers = async (): Promise<void> => {
        const token: string | null = localStorage.getItem('accessToken');
        const headers: Headers = new Headers();
        headers.append('Authorization', 'Bearer ' + token);
        const options: RequestOptionsModel = {
            method: 'GET',
            headers,
        };

        const request: Request = new Request(USER_PATH, options);
        await fetch(request)
            .then((res: Response) => res.json())
            .then((user: UserModel[]) => this.setState({ user }))
            .catch(error => error);
    }

    handleEditItem = (id: string): void => {
        const {roleOptions} = this.state;
        this.setState({isEdit: true, userId: id, selectedRole: roleOptions[0].value});
    }

    hangleSelectUserRole = (event: any): void => {
        const value: string = event.value;
     
        this.setState({ selectedRole: value });
    }

    updateUserRole = (data: UpdateUserRole): void => {
        const token: string | null = localStorage.getItem('accessToken');
        const headers: Headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Bearer ' + token);
        const json: string = JSON.stringify(data);

        const options: RequestOptionsModel = {
            method: 'PUT',
            headers,
            body: json,
        };

        const request: Request = new Request(USER_ROLE_PATH, options);
        fetch(request)
            .then((res: Response) => res.json())
            .then((updatedUserRole: any) => {
                if(updatedUserRole) {
                    this.getUsers();
                    this.setState({isEdit: false})
                }
            })
            .catch(error => error);

    }

    handleSaveItem = (id: string): void => {
        const { selectedRole } = this.state;
        const updateUserRole: UpdateUserRole = {
            userId: id,
            roleId: selectedRole,
        };
        this.updateUserRole(updateUserRole);
    }

    render() {
        const { isRoleUser, user, isEdit, roleOptions, userId } = this.state;
        console.log('role', roleOptions);
        return (
            <div className="content">
                {!isRoleUser && <div className="cart-table">
                    <table className="table_blur">
                        <thead>
                            <tr>
                                <th>First name</th>
                                <th>Last name</th>
                                <th>Role</th>
                                <th>Email</th>
                                <th>Confirmed email</th>
                                <th></th>
                            </tr>
                        </thead>
                        {user.map(({ id, firstName, lastName, name, email, emailConfirmed }) => (
                            <tr key={id}>
                                <th>{firstName}</th>
                                <th>{lastName}</th>
                                {isEdit && userId == id ? <th>
                                    <Select
                                        options={roleOptions}
                                        defaultValue={[roleOptions[0]]}
                                        onChange={this.hangleSelectUserRole}
                                    />
                                </th> : <th>{name}</th>}
                                <th>{email}</th>
                                <th>{emailConfirmed}</th>
                                {isEdit && userId == id ? <th><button className="button-edit" onClick={() => this.handleSaveItem(id)}>save</button></th> : <th><button className="button-edit" onClick={() => this.handleEditItem(id)}>edit</button></th>} 
                            </tr>
                        ))}
                        <tfoot>
                        </tfoot>
                    </table>
                </div>}
            </div>
        );
    }
}
export default UserTable;