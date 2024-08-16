import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "src/entities/Category.entity";
import { In, Repository } from "typeorm";
import { FindCategoryParams } from "./category.types";
import { CreateCategoryDto } from "./dto/create-category.dto";

@Injectable()

export class CategoryService {
    constructor(
        @InjectRepository(Category)
        private categoryRepo: Repository<Category>
    ) { }

    find({ where, select }: FindCategoryParams = {}) {
        return this.categoryRepo.find({ where, select })
    }

    findOne({ where, select }: FindCategoryParams = {}) {
        return this.categoryRepo.findOne({ where, select })
    }

    findByIds(ids: number[]) {
        return this.categoryRepo.findBy({ id: In(ids) })

    }


    async create(params: CreateCategoryDto) {
        let category = this.categoryRepo.create(params);
        await category.save();
        return category;
    }
    async delete(id: number) {
        let result = await this.categoryRepo.delete({ id });
        if (result.affected === 0) throw new NotFoundException();
        return {
            message: 'Category is deleted successfully',
        };
    }
}