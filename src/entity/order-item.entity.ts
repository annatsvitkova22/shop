import { Table, Column, Model, DataType, BelongsToMany, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
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
    @Column({allowNull: true})
    pritingEditionId: string;

    @ForeignKey(() => Order)
    @Column({allowNull: true})
    orderId: string;

    @Column({ allowNull: false })
    count: number;

    // @ManyToOne(() => PrintingEdition,  printingEdition => printingEdition.printingEditionConnection, {primary:
    //     true})
    // @JoinColumn({name: 'printing-edition_id'})
    // printingEdition?: PrintingEdition[];

    // @ManyToOne(() => Order,  order => order.orderItemConnection, {primary:
    //     true})
    // @JoinColumn({name: 'order_id'})
    // orderItem?: OrderItem[];
}
