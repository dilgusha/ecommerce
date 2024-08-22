import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "src/entities/Product.entity";
import { And, ILike, In, LessThanOrEqual, MoreThanOrEqual, Repository } from "typeorm";
import { FindProductParams } from "./product.types";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { CategoryService } from "src/category/category.service";

@Injectable()
export class ProductService {
    constructor(
        private categoryService: CategoryService,
        @InjectRepository(Product)
        private productRepo: Repository<Product>
    ) { }


    async find({ where, select, relations, filter, pagination }: FindProductParams = {}) {
        if (!where) where = {}

        if (filter) {
            if (filter.name) {
                where.name = ILike(`%${filter.name}%`)
            }
            if (filter.price) {
                const [min, max] = filter.price;
                let price = []
                if (min > 0) {
                    price.push(MoreThanOrEqual(min));
                }
                if (max > 0) {
                    price.push(LessThanOrEqual(max));
                }
                if (price.length) {
                    where.price = And(...price)
                }
            }
            if (filter.categories) {
                where.categories = filter.categories.map((categoryId) => {
                    return {
                        id: categoryId
                    }
                })
            }
        }

        return this.productRepo.find(
            {
                where, select, relations,
                take: pagination?.limit,
                skip: pagination && pagination.limit * pagination.page,
                order: {
                    updatedAt: 'DESC'
                }
            }
        )
    }
    async findOne({ where, select }: FindProductParams = {}) {
        return this.productRepo.findOne({ where, select })
    }

    async create(body: CreateProductDto) {
        const categories = await this.categoryService.findByIds(body.categories);
        let product = this.productRepo.create({ ...body, categories: categories })
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