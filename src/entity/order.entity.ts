import { Table, Column, Model, DataType, BelongsToMany, ForeignKey, BelongsTo, HasOne, HasMany, IsUUID, PrimaryKey } from 'sequelize-typescript';
import { User, Payment, OrderItem } from 'src/entity';

@Table({timestamps: false})
export class Order extends Model<Order> {
    @Column({
        type: DataType.UUID,
        unique: true,
        allowNull: false,
        primaryKey: true,
    })
    id: string;

    @Column({ allowNull: true })
    description: string;

    @ForeignKey(() => User)
    @Column
    userId: string;
    @BelongsTo(() => User, 'userId')
    user: User;

    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    date: Date;

    @ForeignKey(() => Payment)
    @Column({ allowNull: true })
    paymentId: string;

    // @HasOne(() => Payment, '')
    // peyment: Payment;
    // @HasMany(() => User, 'userId')
    // user: User;

    // @ManyToOne(() => User,  user => user.userConnection, {primary:
    //     true})
    // @JoinColumn({name: 'user_id'})
    // user?: User[];

    // @OneToOne(() => Payment,  payment => payment.paymentConnection, {primary:
    //     true})
    // @JoinColumn({name: 'payment_id'})
    // payment?: Payment[];

    // @OneToMany(() => OrderItem, orderItem => orderItem.orderId)
    // orderItemConnection?: Promise<OrderItem[]>;
}
