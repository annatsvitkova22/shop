import { Table, Column, Model, DataType, BelongsTo, HasOne } from 'sequelize-typescript';
import { Order } from 'src/entity';

@Table({timestamps: false})
export class Payment extends Model<Payment> {
    @Column({
        type: DataType.UUID,
        unique: true,
        allowNull: false,
        primaryKey: true,
    })
    id: string;

    @Column({ allowNull: false })
    transactionId: string;

    @HasOne(() => Order, 'paymentId')
    order: Order;
}
