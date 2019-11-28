import { Author, PrintingEdition } from 'src/entity';
import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';

@Table({timestamps: false})
export class AuthorInBooks extends Model<AuthorInBooks> {
    @Column({
        type: DataType.UUID,
        unique: true,
        allowNull: false,
        primaryKey: true,
    })
    id: string;

    @ForeignKey(() => Author)
    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    authorId: string;
    @BelongsTo(() => Author, 'authorId')
    author: Author;

    @ForeignKey(() => PrintingEdition)
    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    bookId: string;
    @BelongsTo(() => PrintingEdition, 'bookId')
    printingEdition: PrintingEdition;
}
