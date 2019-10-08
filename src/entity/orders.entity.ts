import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToOne, OneToMany} from 'typeorm';
import { User, Payment, OrderItem } from 'src/entity';
@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id?: number;
    @Column()
    description?: string;
    @Column({name: 'user_id'})
    userId?: number;
    @Column()
    date?: Date;
    @Column({name: 'payment_id'})
    paymentId?: number;

    @ManyToOne(() => User,  user => user.userConnection, {primary:
        true})
    @JoinColumn({name: 'user_id'})
    user?: User[];

    @OneToOne(() => Payment,  payment => payment.paymentConnection, {primary:
        true})
    @JoinColumn({name: 'payment_id'})
    payment?: Payment[];

    @OneToMany(() => OrderItem, orderItem => orderItem.orderId)
    orderItemConnection?: Promise<OrderItem[]>;
}
