import { Table, Column, Model, DataType, BelongsToMany } from 'sequelize-typescript';
import { UserInRoles, User } from 'src/entity';
import uuid = require('uuid/v4');

@Table({timestamps: false})
export class Role extends Model<Role> {
    @Column({
        type: DataType.UUID,
        unique: true,
        allowNull: false,
        primaryKey: true,
        defaultValue: uuid(),
    })
    id?: string;

    @Column({ allowNull: false })
    name?: string;

    @BelongsToMany(() => User, () => UserInRoles)
    users: User[];

    // @OneToMany(() => UserInRoles, userInRoles => userInRoles.roleId)
    // roleConnection?: Promise<UserInRoles[]>;
}
