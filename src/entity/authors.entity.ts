import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Author {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ length: 25 })
    name: string;
}
