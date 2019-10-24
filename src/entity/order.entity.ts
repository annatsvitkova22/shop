import { Table, Column, Model, DataType, BelongsToMany, ForeignKey, BelongsTo, HasOne, HasMany, IsUUID, PrimaryKey } from 'sequelize-typescript';
import { User, Payment, OrderItem } from 'src/entity';
import uuid = require('uuid/v4');

@Table({timestamps: false})
export class Order extends Model<Order> {
    @Column({
        type: DataType.UUID,
        unique: true,
        allowNull: false,
        primaryKey: true,
        defaultValue: uuid(),
    })

    @Column({ allowNull: true })
    description?: string;

    @ForeignKey(() => User)
    @Column({ allowNull: true })
    userId?: string;

    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    date?: Date;

    @ForeignKey(() => Payment)
    @Column({ allowNull: true })
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
