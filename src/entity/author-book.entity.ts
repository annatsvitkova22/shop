import { Author, PrintingEdition } from 'src/entity';
import { Table, Column, Model, DataType, ForeignKey } from 'sequelize-typescript';

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
    @Column({allowNull: false})
    authorId: string;

    @ForeignKey(() => PrintingEdition)
    @Column({allowNull: false})
    bookId: string;
}
