import { Body, Controller, Delete, Get, Param, Post, UseGuards } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "src/guards/auth.guard";
import { CreateCategoryDto } from "./dto/create-category.dto";

@Controller()
@ApiTags('Category')
export class CategoryController {
    constructor(private categoryService: CategoryService) { }

    @Get()
    list() {
        return this.categoryService.find();
    }

    @Get(':id')
    item(@Param('id') id: number) {
        return this.categoryService.findOne({ where: { id } });
    }

    @Post()
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    create(@Body() body: CreateCategoryDto) {
        return this.categoryService.create(body)
    }

    @Delete(':id')
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    delete(@Param('id') id: number) {
        return this.categoryService.delete(id)
    }
}