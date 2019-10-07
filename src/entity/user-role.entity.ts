import { Entity, Column, OneToOne, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User, Role } from 'src/entity';

@Entity()
export class UserInRoles {
    @PrimaryGeneratedColumn()
    id?: number;
    @Column({name: 'role_id'})
    roleId?: number;
    @Column({name: 'user_id'})
    userId?: number;

    @OneToOne(() => User,  user => user.userRoleConnection, {primary:
        true})
    @JoinColumn({name: 'user_id'})
    user?: User[];

    @OneToMany(() => Role,  role => role.roleConnection, {primary:
        true})
    @JoinColumn({name: 'role_id'})
    role?: Role[];
}
