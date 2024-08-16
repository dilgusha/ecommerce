import { Product, ProductKey } from "src/entities/Product.entity";
import { FindOptionsWhere } from "typeorm";

export interface FindProductParams{
    where?: FindOptionsWhere<Product>,
    select?: ProductKey[],
}