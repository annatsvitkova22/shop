import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Test {
    @PrimaryGeneratedColumn('uuid')
    id?: string;
    @Column()
    name?: string;
}
