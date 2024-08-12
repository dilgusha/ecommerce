import { Column, Entity } from "typeorm";
import { BaseEntity } from "./Base.entity";

export type UserKey=keyof User;

@Entity()
export class User extends BaseEntity {
    @Column()
    email:string;

    @Column({select:false})
    password:string;

    @Column()
    firstName:string;

    @Column()
    lastName:string;
    
}