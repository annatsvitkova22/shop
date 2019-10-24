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
    id?: string;
    @ForeignKey(() => Author)
    @Column({allowNull: false})
    authorId?: string;
    @ForeignKey(() => PrintingEdition)
    @Column({allowNull: false})
    bookId?: string;

    // @ManyToOne(() => Author,  author => author.authorConnection, {primary:
    //     true})
    // @JoinColumn({name: 'author_id'})
    // author?: Author[];

    // @ManyToOne(() => PrintingEdition,  printingEdition => printingEdition.bookConnection, {primary:
    //     true})
    // @JoinColumn({name: 'book_id'})
    // printingEdition?: PrintingEdition[];
}
