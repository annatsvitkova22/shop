import { Table, Column, Model, DataType, BelongsToMany, HasOne } from 'sequelize-typescript'; import { Order, UserInRoles } from 'src/entity';
import uuid = require('uuid/v4');

@Table({timestamps: false})
export class Payment extends Model<Payment> {
    @Column({
        type: DataType.UUID,
        unique: true,
        allowNull: false,
        primaryKey: true,
        defaultValue: uuid(),
    })
    id?: string;

    @Column({ allowNull: false })
    transactionId?: string;

    // @HasOne(() => Order)
    // order: Order;

    // @OneToOne(() => Order, order => order.paymentId)
    // paymentConnection?: Promise<Order[]>;
}
