import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne } from 'typeorm';
import { Order, UserInRoles } from 'src/entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id?: number;
    @Column({ length: 25 })
    firstName?: string;
    @Column()
    lastName?: string;
    @Column()
    passwordHash?: string;
    @Column()
    email?: string;
    @Column()
    salt?: string;

    @OneToMany(() => Order, order => order.userId)
    userConnection?: Promise<Order[]>;

    @OneToOne(() => UserInRoles, userInRoles => userInRoles.userId)
    userRoleConnection?: Promise<UserInRoles[]>;
}
