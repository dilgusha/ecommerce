import { Body, Controller, Delete, Get, Param, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { ProductService } from "./product.service";
import { AuthGuard } from "src/guards/auth.guard";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";

@Controller('product')
@ApiTags('Product')
export class ProductsController {
    constructor(
        private productsService: ProductService
    ) { }

    @Get()
    list() {
        return this.productsService.find();
    }

    @Get(':id')
    item(@Param('id') id: number) {
        return this.productsService.findOne({ where: { id } })
    }

    @Post()
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    create(@Body() body: CreateProductDto) {
        return this.productsService.create(body);
    }

    @Post(':id')
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    update(@Param('id') id: number, @Body() body: UpdateProductDto) {
        return this.productsService.update(id, body)
    }

    @Delete(':id')
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    delete(@Param('id') id: number) {
        return this.productsService.delete(id)
    }
}