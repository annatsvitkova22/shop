import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { PrintingEdition, Order } from 'src/entity';

@Entity()
export class OrderItem {
    @PrimaryGeneratedColumn('uuid')
    id?: string;
    @Column()
    amount?: number;
    @Column()
    currency?: string;
    @Column({name: 'printing-edition_id'})
    pritingEditionId?: string;
    @Column({name: 'order_id'})
    orderId?: string;
    @Column()
    count?: number;

    @ManyToOne(() => PrintingEdition,  printingEdition => printingEdition.printingEditionConnection, {primary:
        true})
    @JoinColumn({name: 'printing-edition_id'})
    printingEdition?: PrintingEdition[];

    @ManyToOne(() => Order,  order => order.orderItemConnection, {primary:
        true})
    @JoinColumn({name: 'order_id'})
    orderItem?: OrderItem[];
}
