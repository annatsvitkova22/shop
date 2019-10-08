import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { UserInRoles } from 'src/entity';
@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    id?: number;
    @Column({ length: 25 })
    name?: string;

    @OneToMany(() => UserInRoles, userInRoles => userInRoles.roleId)
    roleConnection?: Promise<UserInRoles[]>;
}
