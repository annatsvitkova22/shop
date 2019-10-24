import { Table, Column, Model, DataType, BelongsToMany, ForeignKey, BelongsTo, HasOne, HasMany, IsUUID, PrimaryKey } from 'sequelize-typescript';
import { User, Payment, OrderItem } from 'src/entity';

@Table({timestamps: false})
export class Order extends Model<Order> {
    @IsUUID(4)
    @PrimaryKey
    @Column
    id?: string;
    @Column({ allowNull: true })
    description?: string;
    @ForeignKey(() => User)
    @Column({ allowNull: false })
    userId?: string;
    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    date?: Date;
    @ForeignKey(() => Payment)
    @Column({ allowNull: false })
    paymentId?: string;

    // @HasOne(() => Payment)
    // peyment: Payment;
    // @BelongsTo(() => User)
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
