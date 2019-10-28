import { Table, Column, Model, DataType, ForeignKey } from 'sequelize-typescript';
import { User, Role } from 'src/entity';

@Table({timestamps: false})
export class UserInRoles extends Model<UserInRoles> {
    @Column({
        type: DataType.UUID,
        unique: true,
        allowNull: false,
        primaryKey: true,
    })
    id: string;

    @ForeignKey(() => Role)
    @Column({allowNull: false})
    roleId: string;

    @ForeignKey(() => User)
    @Column({allowNull: false})
    userId: string;
}
