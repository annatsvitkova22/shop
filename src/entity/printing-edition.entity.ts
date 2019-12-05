import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { OrderItem, AuthorInBooks } from 'src/entity';

@Table({timestamps: false})
export class PrintingEdition extends Model<PrintingEdition> {
    @Column({
        type: DataType.UUID,
        unique: true,
        allowNull: false,
        primaryKey: true,
    })
    id: string;

    @Column({ allowNull: false })
    name: string;

    @Column({ allowNull: true })
    description: string;

    @Column({ allowNull: false })
    price: number;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    })
    isRemoved: boolean;

    @Column({ allowNull: false })
    status: string;

    @Column({ allowNull: false })
    currency: string;

    @Column({ allowNull: false })
    type: string;

    @Column({
        type: DataType.STRING(10000),
        allowNull: false })
    image: string;

    @HasMany(() => OrderItem, 'pritingEditionId')
    orderItems: OrderItem[];

    @HasMany(() => AuthorInBooks, 'bookId')
    authorInBooks: AuthorInBooks[];
}
