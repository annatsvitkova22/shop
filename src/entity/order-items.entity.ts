import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class OrderItem {
    @PrimaryGeneratedColumn()
    id?: number;
    @Column()
    amount?: number;
    @Column()
    currency?: string;
    @Column()
    pritingEditionId?: number;
    @Column()
    count?: string;
}
