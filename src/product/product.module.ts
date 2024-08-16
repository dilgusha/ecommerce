import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "src/entities/Product.entity";
import { ProductsController } from "./product.controller";
import { ProductService } from "./product.service";
import { CategoryModule } from "../category/category.module";

@Module({
    imports:[TypeOrmModule.forFeature([Product]),CategoryModule],
    controllers:[ProductsController],
    providers:[ProductService]
})

export class ProductModule {

}