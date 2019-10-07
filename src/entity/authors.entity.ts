import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { AuthorInBooks } from 'src/entity';
@Entity()
export class Author {
    @PrimaryGeneratedColumn()
    id?: number;
    @Column()
    name?: string;

    @OneToOne(() => AuthorInBooks, authorInBooks => authorInBooks.authorId)
    authorConnection?: Promise<AuthorInBooks[]>;
}
