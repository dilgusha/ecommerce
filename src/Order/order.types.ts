import { Order } from "src/entities/Order.entity";
import { FindOptionsSelect, FindOptionsWhere } from "typeorm";

export interface FindOrderParams{
    where?: FindOptionsWhere<Order>
    select?:FindOptionsSelect<Order>
    relations?: string[],
    pagination:{
        limit:number,
        page:number
    }
}