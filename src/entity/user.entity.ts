import { ApiModelProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';
import { Table, Column, Model, DataType, BelongsToMany, HasMany, Default } from 'sequelize-typescript';
import { Order, UserInRoles, Role } from 'src/entity';

@Table({timestamps: false})
export class User extends Model<User> {
    @ApiModelProperty()
    @Column({
        type: DataType.UUID,
        unique: true,
        allowNull: false,
        primaryKey: true,
    })
    id: string;

    @ApiModelProperty()
    @Column({ allowNull: false })
    firstName: string;

    @ApiModelProperty()
    @Column({ allowNull: false })
    lastName: string;

    @ApiModelProperty()
    @Column({ allowNull: false })
    passwordHash: string;

    @ApiModelProperty()
    @IsEmail()
    @Column({
        allowNull: false,
        validate: {
            isEmail: true,
        },
    })
    email: string;

    @ApiModelProperty()
    @Column({ allowNull: false })
    salt: string;

    @ApiModelProperty()
    @Column({ allowNull: true })
    saltForEmail: string;

    @ApiModelProperty()
    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    })
    emailConfirmed: boolean;

    @HasMany(() => Order)
    orders: Order[];

    // @BelongsToMany(() => Role, () => UserInRoles)
    // roles: Role[];

    // @HasMany(() => Order, 'userId')
    // orders: Order[];

    //  @HasOne(() => Order)
    //  orders: Order;

    // @OneToMany(() => Order, order => order.userId)
    // userConnection?: Promise<Order[]>;

    // @OneToOne(() => UserInRoles, userInRoles => userInRoles.userId)
    // userRoleConnection?: Promise<UserInRoles[]>;
}
