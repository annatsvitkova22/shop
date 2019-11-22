import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany, HasOne } from 'sequelize-typescript';
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
    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    userId: string;
    @BelongsTo(() => User, 'userId')
    user: User;

    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    date: Date;

    @ForeignKey(() => Payment)
    @Column({
        type: DataType.UUID,
        allowNull: true,
    })
    paymentId: string;
    @BelongsTo(() => Payment, 'paymentId')
    payment: Payment;

    @HasMany(() => OrderItem, 'orderId')
    orderItems: OrderItem[];
}
