import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    description: string;
    @Column()
    userId: number;
    @Column()
    date: Date;
    @Column()
    paymentId: number;
}
