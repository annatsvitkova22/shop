import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { AuthorInBooks } from 'src/entity';
@Entity()
export class Author {
    @PrimaryGeneratedColumn()
    id?: number;
    @Column()
    name?: string;

    @OneToMany(() => AuthorInBooks, authorInBooks => authorInBooks.authorId)
    authorConnection?: Promise<AuthorInBooks[]>;
}
