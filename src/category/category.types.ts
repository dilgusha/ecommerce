import { Category, CategoryKey } from "src/entities/Category.entity";
import { FindOptionsWhere } from "typeorm";

export interface FindCategoryParams {
    where?: FindOptionsWhere<Category>,
    select?: CategoryKey[],
    relations?: string[],
    filter?: {
        name?: string
    };
    pagination?: {
        limit: number,
        page: number
    }
}