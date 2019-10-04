import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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

}
