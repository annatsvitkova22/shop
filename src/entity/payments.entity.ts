import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { Order } from 'src/entity';
@Entity()
export class Payment {
    @PrimaryGeneratedColumn()
    id?: number;
    @Column()
    transactionId?: string;

    @OneToOne(() => Order, order => order.paymentId)
    paymentConnection?: Promise<Order[]>;
}
