import { Table, Column, Model, DataType, ForeignKey } from 'sequelize-typescript';
import { User, Role } from 'src/entity';
import uuid = require('uuid/v4');

@Table({timestamps: false})
export class UserInRoles extends Model<UserInRoles> {
    @Column({
        type: DataType.UUID,
        unique: true,
        allowNull: false,
        primaryKey: true,
        defaultValue: uuid(),
    })
    id?: string;

    @ForeignKey(() => Role)
    @Column({allowNull: false})
    roleId?: string;

    @ForeignKey(() => User)
    @Column({allowNull: false})
    userId?: string;

    // @OneToOne(() => User,  user => user.userRoleConnection, {primary:
    //     true})
    // @JoinColumn({name: 'user_id'})
    // user?: User[];

    // @ManyToOne(() => Role,  role => role.roleConnection, {primary:
    //     true})
    // @JoinColumn({name: 'role_id'})
    // role?: Role[];
}
