import { ApiModelProperty, ApiProduces } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne } from 'typeorm';
import { Order, UserInRoles } from 'src/entity';

@Entity()
export class User {
    @ApiModelProperty()
    @PrimaryGeneratedColumn()
    id?: number;
    @ApiModelProperty()
    @Column({ length: 25 })
    firstName?: string;
    @ApiModelProperty()
    @Column()
    lastName?: string;
    @ApiModelProperty()
    @Column()
    passwordHash?: string;
    @ApiModelProperty()
    @Column()
    email?: string;
    @ApiModelProperty()
    @Column()
    salt?: string;

    @OneToMany(() => Order, order => order.userId)
    userConnection?: Promise<Order[]>;

    @OneToOne(() => UserInRoles, userInRoles => userInRoles.userId)
    userRoleConnection?: Promise<UserInRoles[]>;
}
