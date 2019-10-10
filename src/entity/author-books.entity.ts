import { Entity, Column, JoinColumn, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Author, PrintingEdition } from 'src/entity';
@Entity()
export class AuthorInBooks {
    @PrimaryGeneratedColumn()
    id?: number;
    @Column({name: 'author_id'})
    authorId?: number;
    @Column({name: 'book_id'})
    bookId?: number;

    @ManyToOne(() => Author,  author => author.authorConnection, {primary:
        true})
    @JoinColumn({name: 'author_id'})
    author?: Author[];

    @ManyToOne(() => PrintingEdition,  printingEdition => printingEdition.bookConnection, {primary:
        true})
    @JoinColumn({name: 'book_id'})
    printingEdition?: PrintingEdition[];
}
