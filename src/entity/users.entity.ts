import { ApiModelProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';
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
    @IsEmail()
    @Column()
    email?: string;
    @ApiModelProperty()
    @Column()
    salt?: string;
    @ApiModelProperty()
    @Column()
    saltForEmail?: string;
    @ApiModelProperty()
    @Column()
    emailConfirmed?: boolean;

    @OneToMany(() => Order, order => order.userId)
    userConnection?: Promise<Order[]>;

    @OneToOne(() => UserInRoles, userInRoles => userInRoles.userId)
    userRoleConnection?: Promise<UserInRoles[]>;
}
