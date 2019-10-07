import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { PrintingEdition } from 'src/entity';

@Entity()
export class OrderItem {
    @PrimaryGeneratedColumn()
    id?: number;
    @Column()
    amount?: number;
    @Column()
    currency?: string;
    @Column({name: 'printing-edition_id'})
    pritingEditionId?: number;
    @Column()
    count?: string;

    @ManyToOne(() => PrintingEdition,  printingEdition => printingEdition.printingEditionConnection, {primary:
        true})
    @JoinColumn({name: 'printing-edition_id'})
    printingEdition?: PrintingEdition[];
}
