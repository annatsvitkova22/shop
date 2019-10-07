import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { OrderItem, AuthorInBooks } from 'src/entity';

@Entity()
export class PrintingEdition {
    @PrimaryGeneratedColumn()
    id?: number;
    @Column({ length: 25 })
    name?: string;
    @Column()
    description?: string;
    @Column()
    price?: number;
    @Column()
    isRemoved?: string;
    @Column()
    status?: string;
    @Column()
    currency?: string;
    @Column()
    type?: string;

    @OneToMany(() => OrderItem, orderItem => orderItem.pritingEditionId)
    printingEditionConnection?: Promise<OrderItem[]>;

    @ManyToOne(() => AuthorInBooks, authorInBooks => authorInBooks.bookId)
    bookConnection?: Promise<AuthorInBooks[]>;
}
