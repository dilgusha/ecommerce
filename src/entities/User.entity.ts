import { BeforeInsert, Column, Entity,BaseEntity } from "typeorm";

import * as bcrypt from 'bcrypt';
import { CommonEntity } from "./Common.entity";

export type UserKey = keyof User;

@Entity()
export class User extends CommonEntity {
    @Column({unique:true})
    email: string;

    @Column({ select: false })
    password: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @BeforeInsert()
    async beforeInsert() {
        this.password = await bcrypt.hash(this.password, 10)
    }

}