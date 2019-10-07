import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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

}
