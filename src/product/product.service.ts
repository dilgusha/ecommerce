import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "src/entities/Product.entity";
import { In, Repository } from "typeorm";
import { FindProductParams } from "./product.types";
import { CreateProductDto } from "./dto/create-product.dto";
import { NotFoundError } from "rxjs";
import { UpdateProductDto } from "./dto/update-product.dto";
import { CategoryService } from "src/category/category.service";

@Injectable()
export class ProductService {
    constructor(
        private categoryService: CategoryService,
        @InjectRepository(Product)
        private productRepo: Repository<Product>
    ) { }


    async find({ where, select }: FindProductParams = {}) {
        return this.productRepo.find({ where, select, relations: ['categories'] })
    }
    async findOne({ where, select }: FindProductParams = {}) {
        return this.productRepo.findOne({ where, select })
    }

    async create(params: CreateProductDto) {
        let product = this.productRepo.create(params)
        await product.save()
        return product
    }

    async update(id: number, params: UpdateProductDto) {
        let product = await this.findOne({ where: { id } })
        for (let key in params) {
            if (key === 'categories') {
                product.categories = await this.categoryService.findByIds(
                    params.categories,
                );
            } else {
                product[key] = params[key];
            }
        }

        await product.save();

        return product;
    }

    async delete(id: number) {
        let result = await this.productRepo.delete({ id })
        if (result.affected === 0) {
            throw new NotFoundException()
        }
        return {
            message: 'Product is deleted successfully'
        }
    }
}