import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { PrintingEdition, Order } from 'src/entity';

@Table({timestamps: false})
export class OrderItem extends Model<OrderItem> {
    @Column({
        type: DataType.UUID,
        unique: true,
        allowNull: false,
        primaryKey: true,
    })
    id: string;

    @Column({ allowNull: false })
    amount: number;

    @Column({ allowNull: false })
    currency: string;

    @ForeignKey(() => PrintingEdition)
    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    pritingEditionId: string;
    @BelongsTo(() => PrintingEdition, 'pritingEditionId')
    printingEdition: PrintingEdition;

    @ForeignKey(() => Order)
    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    orderId: string;
    @BelongsTo(() => Order, 'orderId')
    order: Order;

    @Column({ allowNull: false })
    count: number;
}
