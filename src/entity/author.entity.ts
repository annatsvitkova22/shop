import { AuthorInBooks, PrintingEdition } from 'src/entity';
import { Table, Column, Model, DataType, BelongsToMany } from 'sequelize-typescript';

@Table({timestamps: false})
export class Author extends Model<Author> {
    @Column({
        type: DataType.UUID,
        unique: true,
        allowNull: false,
        primaryKey: true,
    })
    id: string;

    @Column({
        allowNull: false})
    name: string;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    })
    isRemoved: boolean;

    @BelongsToMany(() => PrintingEdition, () => AuthorInBooks)
    printingEdition: PrintingEdition[];
}
