import { BeforeInsert, Column, Entity, BaseEntity, OneToMany } from "typeorm";

import * as bcrypt from 'bcrypt';
import { CommonEntity } from "./Common.entity";
import { Order } from "./Order.entity";
import { UserRoles } from "src/common/enum/user-roles.enum";

export type UserKey = keyof User;

@Entity()
export class User extends CommonEntity {
    @Column({ unique: true })
    email: string;

    @Column({ select: false })
    password: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ type: 'enum', enum: UserRoles, array: true,nullable: true })
    roles: UserRoles[];

    @OneToMany(() => Order, (order) => (order.user), { onDelete: 'CASCADE' })
    orders: Order[];

    @BeforeInsert()
    async beforeInsert() {
        this.password = await bcrypt.hash(this.password, 10)
    }

}