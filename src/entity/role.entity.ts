import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { UserInRoles } from 'src/entity';

@Table({timestamps: false})
export class Role extends Model<Role> {
    @Column({
        type: DataType.UUID,
        unique: true,
        allowNull: false,
        primaryKey: true,
    })
    id: string;

    @Column({ allowNull: false })
    name: string;

    // @BelongsToMany(() => User, () => UserInRoles)
    // users: User[];

    @HasMany(() => UserInRoles, 'roleId')
    userInRoles: UserInRoles[];
}
